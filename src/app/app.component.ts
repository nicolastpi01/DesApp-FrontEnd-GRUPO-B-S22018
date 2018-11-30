import {Component, Input} from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthService } from 'angularx-social-login';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auctions-app';
  currentUser: User;


    constructor(private translate: TranslateService, private router: Router, private authenticationService: AuthenticationService, private authService: AuthService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    }

  switchLanguage(lang) {
    this.translate.use(lang);
  }

    logout() {
        // requiere token
        this.authenticationService.logout();
        this.authService.signOut();
        this.router.navigate(['/login']);
    }

    ngOnDestroy() {
        /*
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        */
        this.logout();
    }

}
