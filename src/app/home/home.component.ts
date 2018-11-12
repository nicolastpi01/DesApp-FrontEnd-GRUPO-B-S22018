import { Component, OnInit } from '@angular/core';
import { Auction } from '../auction';
import { AuctionService } from '../auction.service';
import { AUCTIONS } from '../mock-auctions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    popularAuctions: Auction[];
    recentsAuctions: Auction[];
    nextToFinishAuctions: Auction[];
    //popularAuctions = AUCTIONS; // mock-data
    //recentsAuctions = AUCTIONS; // mock-data
    //nextToFinishAuctions = AUCTIONS; // mock-data
    // registerUser: User ??????
    
  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
      this.getPopulars();
      this.getRecents();
      this.getNextToFinish();
  }
    
    getPopulars(): void {
        this.auctionService.getPopularAuctions()
        .subscribe(auctions => this.popularAuctions = auctions);
    }
    
    getRecents(): void {
        this.auctionService.getRecentAuctions()
        .subscribe(auctions => this.recentsAuctions = auctions);
    }
    
    getNextToFinish(): void {
        this.auctionService.getNextToFinishAuctions()
        .subscribe(auctions => this.nextToFinishAuctions = auctions);
    }

}
