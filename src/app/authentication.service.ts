import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';


//declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    //readonly clientId = '1007001374216-qbfqbmehit1d4vtak8na4hp98dg1umv8.apps.googleusercontent.com';
    private auth2: any;
    
    private usersUrl = '//localhost:8080/users';  // URL to web api

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        //gapi.load('auth2', () => {
        //gapi.auth2.init({
        //client_id: this.clientId,
        //cookiepolicy: 'single_host_origin',
        //scope: 'profile'
        //}).then((auth2) => {
        //this.auth2 = auth2;
      //});
    //});

    //this.user = <User>JSON.parse(localStorage.getItem('user'));
    }

    /*
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    
        older login
    login(username: string, password: string) {
        //return this.http.post<Auction>(this.auctionsUrl, auction, httpOptions).pipe(
        //tap((auction: Auction) => this.log(`added auction w/ id=${auction.id}`)),
        //catchError(this.handleError.handle<Auction>('AuctionService', 'addAuction'))
        //);
        return this.http.post<any>(`${this.usersUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
    */
    
    
    /*
    login() : Observable<any> {
            return this.http.post<any>(`${this.usersUrl}/users/authenticate`, { user })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                //if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }),
            tap(_ => this.log(`updated auction id=${auction.id}`)),
            catchError(this.handleError.handle<any>('AuctionService', 'updateAuction')) 
            );
    }
      
    signIn(): Promise<User> {
        var user: User;
        if (this.auth2.isSignedIn.get()) {
        user = this.extractUser(this.auth2.currentUser.get());
        return Promise.resolve(user);
        }

        return new Promise((resolve, reject) => {
        this.auth2.isSignedIn.listen(signedIn => {
            if (signedIn) {
            user = this.extractUser(this.auth2.currentUser.get());
            resolve(user);
            } else {
            reject('sign-in error');
            }
        });
        this.auth2.signIn();
        });
    }
    
    
    private extractUser(googleUser: any): User {
        const profile = googleUser.getBasicProfile();
        return new User(
        profile.getId(),
        profile.getName(),
        profile.getEmail(),
        );
    }
    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.auth2.isSignedIn.listen(null);
        this.auth2.signOut();
    }
    
    */
    
}

