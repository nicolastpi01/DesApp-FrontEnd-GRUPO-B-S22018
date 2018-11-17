import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        let socialUser  = this.authenticationService.currentSocialUserValue;
        if (currentUser && socialUser) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${socialUser}` // Bearer? sacar eso!
                }
            });
        }

        return next.handle(request);
    }
}