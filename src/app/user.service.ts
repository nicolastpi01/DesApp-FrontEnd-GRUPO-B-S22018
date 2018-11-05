import { Injectable } from '@angular/core';
import { User } from './user';
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

export class UserService {
    private usersUrl = '//localhost:8080/users';  // URL to web api

  constructor(private messageService: MessageService, private http: HttpClient, private handleError: ErrorHandling) { }
    
    /** GET user by id. Will 404 if id not found */
    getUser(id: number): Observable<User> {
        const url = `${this.usersUrl}/${id}`;
        return this.http.get<User>(url).pipe(
            tap(_ => this.log(`fetched user id=${id}`)),
            catchError(this.handleError.handle<User>('UserService',`getUser id=${id}`))
        );
    }
    
    getUserAuctions(id: number): Observable<Auction[]> {
         // TODO: send the message _after_ fetching the auctions
        // /users/myAuctions/{userId}
        this.messageService.add('MessageService: fetched user auctions');
        const url = `${this.usersUrl}/myAuctions/${id}`;
        return this.http.get<Auction[]>(url).pipe(
            catchError(this.handleError.handle('UserService','getUserAuctions', []))
        );
    }
    
    
    getUserAuctionsInWichIBid(id: number): Observable<Auction[]> {
        // TODO: send the message _after_ fetching the auctions
        // @GetMapping("/users/bidAuctions/{userId}")
        this.messageService.add('MessageService: fetched user auctions in with bid');
        const url = `${this.usersUrl}/bidAuctions/${id}`;
        //const url = 'localhost:8080/users/bidAuctions/${id}';
        return this.http.get<Auction[]>(url).pipe(
            catchError(this.handleError.handle('UserService', 'getUserAuctionsInWichIBid', []))
        );
    }
    
    /** PUT: update the user on the server */
    updateUser(id: number, user: User): Observable<any> {
        const url = `${this.usersUrl}/${id}`;
        return this.http.put(url, user, httpOptions).pipe(
            tap(_ => this.log(`updated user id=${user.id}`)),
            catchError(this.handleError.handle<any>('UserService', 'updateUser'))
        );
    }
    
    /** DELETE: delete a user from the server */
    deleteUser(user: User | number): Observable<User> {
        const id = typeof user === 'number' ? user : user.id;
        const url = `${this.usersUrl}/${id}`;
        
        return this.http.delete<User>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.handleError.handle<User>('UserService', 'deleteUser'))
        );
    }
    
    
    /** Log a UserService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`UserService: ${message}`);
    }
    
    
}
