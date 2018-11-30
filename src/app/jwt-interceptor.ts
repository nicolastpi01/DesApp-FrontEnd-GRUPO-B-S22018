import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if user available
        let currentUser = this.authenticationService.currentUserValue;

        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    authorization: `Bearer ${currentUser.accessToken}`
                }
            });
            //return next.handle(request);
        }
        //this.log("");
        return next.handle(request);
    }

    /** Log access token with the MessageService */
    //private log(message: string) {
    //    this.messageService.add(`Jwt-Interceptor token: ${this.authenticationService.currentUserValue.accessToken}`);
    //}
}
