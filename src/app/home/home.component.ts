import { Component, OnInit } from '@angular/core';
import { Auction } from '../auction';
import { AuctionService } from '../auction.service';
import { AUCTIONS } from '../mock-auctions';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    popularAuctions: Auction[];
    recentsAuctions: Auction[];
    nextToFinishAuctions: Auction[];
    auctions$: Observable<Auction[]>;
    private searchTerms = new Subject<string>();
    //popularAuctions = AUCTIONS; // mock-data
    //recentsAuctions = AUCTIONS; // mock-data
    //nextToFinishAuctions = AUCTIONS; // mock-data
    // registerUser: User ??????
    
  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
      this.getPopulars();
      this.getRecents();
      this.getNextToFinish();
      this.auctions$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.auctionService.searchAuctions(term)),
      );
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
    
    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

}
