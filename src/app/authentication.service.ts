import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { MessageService } from './message.service';
import { ErrorHandling } from './errorhandling';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private usersUrl = '//localhost:8080/users';  // URL to web api

    constructor(private http: HttpClient, private messageService: MessageService, private handleError: ErrorHandling) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        //this.currentSocialUserSubject = new BehaviorSubject<SocialUser>(JSON.parse(localStorage.getItem('currentSocialUser')));
        //this.currentSocialUser = this.currentSocialUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /*
    public get currentSocialUserValue(): SocialUser {
        return this.currentSocialUserSubject.value;
    }
    */

    login(email: string) : Observable<any> {
            const url = `${this.usersUrl}/authenticate?email=${email}`;
            return this.http.post<any>(url, httpOptions)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                //if (user) {
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                //localStorage.setItem('currentSocialUser', JSON.stringify(socialUser));
                //this.currentSocialUserSubject.next(socialUser);
                this.currentUserSubject.next(user);

            }),
            tap(_ => this.log(`login user id=${this.currentUserValue.id}`)),
            catchError(this.handleError.handle<any>('AuthenticationService', 'login'))
            );
    }

    /** Log a AuthenticationService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`AuthenticationService: ${message}`);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        //localStorage.removeItem('currentSocialUser');
        this.currentUserSubject.next(null);
        //this.currentSocialUserSubject.next(null);
    }

}
