import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if user available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    authorization: `Bearer ${ currentUser.accessToken }`
                }
            });
        }

        return next.handle(request);
    }
}
