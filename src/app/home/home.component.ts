import { Component, OnInit } from '@angular/core';
import { Auction } from '../auction';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    auctions: Auction[]; // No va acá
    popularAuctions: Auction[];
    recentsAuctions: Auction[];
    nextToFinishAuctions: Auction[];
    // registerUser: User ??????
    
  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
      this.getAuctions();
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
    
    // No va acá --> No va en Home (en Home hay un link a otra vista donde se muestran todas las subastas)
    getAuctions(): void {
        this.auctionService.getAuctions()
        .subscribe(auctions => this.auctions = auctions);
    }
    
    // No va acá --> No va en Home --> va en UserDetail
    add(title: string): void {
        title = title.trim();
        if (!title) { return; }
        this.auctionService.addAuction({ title } as Auction)
        .subscribe(auction => {
        this.auctions.push(auction);
        });
    }
    
    // No va acá --> No va en Home --> va en UserDetail
    delete(auction: Auction): void {
        this.auctions = this.auctions.filter(a => a !== auction);
        this.auctionService.deleteAuction(auction).subscribe();
    }

}
