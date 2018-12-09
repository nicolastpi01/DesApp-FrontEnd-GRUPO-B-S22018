import { Component, OnInit } from '@angular/core';
import { Auction } from '../auction';
import { AuctionService } from '../auction.service';
//import { AUCTIONS } from '../mock-auctions';

@Component({
  selector: 'app-all-auctions',
  templateUrl: './all-auctions.component.html',
  styleUrls: ['./all-auctions.component.css']
})
export class AllAuctionsComponent implements OnInit {
  auctions: Auction[];
 //auctions = AUCTIONS; // with mock-data

  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
      this.getAuctions();
  }

    getAuctions(): void {
        this.auctionService.getAuctions()
        .subscribe(auctions => this.auctions = auctions);
    }

}
