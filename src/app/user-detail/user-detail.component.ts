import { Component, OnInit } from '@angular/core';
import { AUCTIONS } from '../mock-auctions';
import { USER } from '../mock-user';
import { Auction } from '../auction';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AuctionService } from '../auction.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    myAuctions: Auction[];
    auctionsInWichIBid: Auction[];
    user: User;
    registerForm: FormGroup;
    /*
    Si quiero que algo del front se actualize cuando el usuario se logue o desloguea uso esto
    currentUser: User;
    currentUserSubscription: Subscription;
    */
    
    // METADATA FOR FRONT DEVELOP
    //myAuctions = AUCTIONS; // mock data
    //auctionsInWichIBid = AUCTIONS; // mock data
    //user = USER; // mock data
 
  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location, private auctionService: AuctionService, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
      /*
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        }); */
  }

  ngOnInit() {
      this.getUser();
      this.getAuctionsInWichIBid(); // modificar
      this.getMyAuctions(); // modificar
      
      this.registerForm = this.formBuilder.group({
            //title:        ['', [Validators.required, Validators.minLength(10), Validators.minLength(50)]]
            title:        ['', Validators.required],
            description:  ['', Validators.required],
            address:      ['', Validators.required],
            initialPrice: ['', Validators.required],
            endingTime:   ['', Validators.required],
            openingDate:  ['', Validators.required],
            endingDate:   ['', Validators.required],
            //urlPics:      ['', Validators.required],
        });      
  }
    
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    
    
    
    getUser(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id)
        .subscribe(user => this.user = user);
    }
    
    /*
     ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    */
    
    getMyAuctions(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUserAuctions(id)
        .subscribe(auctions => this.myAuctions = auctions);
    }
    
    getAuctionsInWichIBid(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUserAuctionsInWichIBid(id)
        .subscribe(auctions => this.auctionsInWichIBid = auctions);
    }
     
    addAuction(): void {
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        //this.loading = true;
        
        this.auctionService.addAuction(this.registerForm.value)
        .subscribe(auction => {
        this.myAuctions.push(auction);
        });
    }
    
    save(): void {
        // hay que ver que hace normalize, hay que hacer una especie de F5 luego de subscribe
        this.userService.updateUser(this.user.id, this.user)
        .subscribe(() => this.location.normalize);
    }
    
    delete(): void {
        this.userService.deleteUser(this.user).subscribe();
    }
    
    deleteAuction(auction: Auction): void {
        this.myAuctions = this.myAuctions.filter(a => a !== auction);
        this.auctionService.deleteAuction(auction).subscribe();
    }
    
    
}
