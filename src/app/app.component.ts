import { Component } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthService } from "angularx-social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auctions-app';
  currentUser: User;
    
    constructor(private router: Router, private authenticationService: AuthenticationService, private authService: AuthService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    
    logout() {
        // requiere token
        this.authenticationService.logout();
        this.authService.signOut();
        this.router.navigate(['/login']);
    }
  
}




