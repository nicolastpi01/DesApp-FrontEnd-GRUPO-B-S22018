import { Component, OnInit } from '@angular/core'; 
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Auction } from '../auction';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-auction-search',
  templateUrl: './auction-search.component.html',
  styleUrls: ['./auction-search.component.css']
})
export class AuctionSearchComponent implements OnInit {
    
  auctions$: Observable<Auction[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private auctionService: AuctionService) {}
    
  ngOnInit(): void {
      this.auctions$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.auctionService.searchAuctions(term)),
      );
  }
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
}
