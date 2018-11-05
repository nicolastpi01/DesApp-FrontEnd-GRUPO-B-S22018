import { Component, OnInit } from '@angular/core';
import { AUCTIONS } from '../mock-auctions';
import { USER } from '../mock-user';
import { Auction } from '../auction';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    myAuctions: Auction[];
    auctionsInWichIBid: Auction[];
    user: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnInit() {
      this.getUser();
      this.getAuctionsInWichIBid();
      this.getMyAuctions();
  }
    
    getUser(): void {
        //this.user = USER;
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id)
        .subscribe(user => this.user = user);
    }
    
    getMyAuctions(): void {
        //this.myAuctions = AUCTIONS;
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUserAuctions(id)
        .subscribe(auctions => this.myAuctions = auctions);
    }
    
    getAuctionsInWichIBid(): void {
        //this.auctionsInWichIBid = AUCTIONS;
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUserAuctionsInWichIBid(id)
        .subscribe(auctions => this.auctionsInWichIBid = auctions);
    }
    
    save(): void {
        // hay que ver que hace normalize, hay que hacer una especie de F5 luego de subscribe
        this.userService.updateUser(this.user.id, this.user)
        .subscribe(() => this.location.normalize);
    }
    
    delete(): void {
        this.userService.deleteUser(this.user).subscribe();
    }
    
    
}
