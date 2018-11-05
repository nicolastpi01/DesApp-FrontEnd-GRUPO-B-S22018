import { Injectable } from '@angular/core';
import { Auction } from './auction';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorHandling } from './errorhandling';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
    private auctionsUrl = '//localhost:8080/auctions';  // URL to web api
    

  constructor(private messageService: MessageService, private http: HttpClient, private handleError: ErrorHandling) { }
    
    getPopularAuctions(): Observable<Auction[]> {
         // TODO: send the message _after_ fetching the popular auctions
        this.messageService.add('MessageService: fetched popular auctions');
        return this.http.get<Auction[]>(`${this.auctionsUrl}/populars`).pipe(
            catchError(this.handleError.handle('AuctionService', 'getPopularAuctions', []))
        );
    }
    
    getRecentAuctions(): Observable<Auction[]> {
         // TODO: send the message _after_ fetching the recents auctions
        this.messageService.add('MessageService: fetched recents auctions');
        return this.http.get<Auction[]>(`${this.auctionsUrl}/recents`).pipe(
            catchError(this.handleError.handle('AuctionService', 'getRecentsAuctions', []))
        );
    }
    
    getNextToFinishAuctions(): Observable<Auction[]> {
         // TODO: send the message _after_ fetching the next to finish auctions
        this.messageService.add('MessageService: fetched next to finish auctions');
        return this.http.get<Auction[]>(`${this.auctionsUrl}/tofinalize`).pipe(
            catchError(this.handleError.handle('AuctionService', 'getNextToFinishAuctions', []))
        );
    }
    
    getAuctions(): Observable<Auction[]> {
         // TODO: send the message _after_ fetching the auctions
        this.messageService.add('MessageService: fetched auctions');
        return this.http.get<Auction[]>(this.auctionsUrl).pipe(
            catchError(this.handleError.handle('AuctionService', 'getAuctions', []))
        );
    }
    
    
    /** GET auction by id. Will 404 if id not found */
    getAuction(id: number): Observable<Auction> {
        const url = `${this.auctionsUrl}/${id}`;
        return this.http.get<Auction>(url).pipe(
            tap(_ => this.log(`fetched auction id=${id}`)),
            catchError(this.handleError.handle<Auction>('AuctionService', `getAuction id=${id}`))
        );
    }
    
    /** PUT: update the auction on the server */
    updateAuction(id: number, auction: Auction): Observable<any> {
        const url = `${this.auctionsUrl}/${id}`;
        return this.http.put(url, auction, httpOptions).pipe(
            tap(_ => this.log(`updated auction id=${auction.id}`)),
            catchError(this.handleError.handle<any>('AuctionService', 'updateAuction'))
        );
    }
    
    /** POST: add a new auction to the server */
    addAuction(auction: Auction): Observable<Auction> {
        return this.http.post<Auction>(this.auctionsUrl, auction, httpOptions).pipe(
        tap((auction: Auction) => this.log(`added auction w/ id=${auction.id}`)),
        catchError(this.handleError.handle<Auction>('AuctionService', 'addAuction'))
        );
    }
    
    /** DELETE: delete the auction from the server */
    deleteAuction (auction: Auction | number): Observable<Auction> {
        const id = typeof auction === 'number' ? auction : auction.id;
        const url = `${this.auctionsUrl}/${id}`;

        return this.http.delete<Auction>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted auction id=${id}`)),
        catchError(this.handleError.handle<Auction>('AuctionService', 'deleteAuction'))
        );
    }
    
    /* GET auctions whose name contains search term */
    // Hay que modificar este --> Tiene que tener busqueda por titulo y descrip
    searchAuctions(term: string): Observable<Auction[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Auction[]>(`${this.auctionsUrl}/title/?title=${term}`).pipe(
        tap(_ => this.log(`found auctions matching "${term}"`)),
        catchError(this.handleError.handle<Auction[]>('AuctionService', 'searchAuctions', []))
        );
    }
    
    
    /** Log a AuctionService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`AuctionService: ${message}`);
    }
    
    
    

    
}
