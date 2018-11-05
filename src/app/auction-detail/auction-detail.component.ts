import { Component, OnInit, Input } from '@angular/core';
import { Auction } from '../auction';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuctionService }  from '../auction.service';


@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
    @Input() auction: Auction;
    
  constructor(private route: ActivatedRoute, private auctionService: AuctionService, private location: Location) {}

  ngOnInit() {
    this.getAuction();
  }
    
    getAuction(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.auctionService.getAuction(id)
        .subscribe(auction => this.auction = auction);
    }
    
    // Acá se realiza la oferta (con id_usuario, id_auction)
    
    // No va acá. Va en userDetail
    save(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.auctionService.updateAuction(id, this.auction)
        .subscribe(() => this.goBack());
    }
    
    goBack(): void {
        this.location.back();
    }

}
