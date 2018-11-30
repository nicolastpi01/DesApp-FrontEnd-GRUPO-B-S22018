import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, debounceTime } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { AuthService,
        SocialUser,
        FacebookLoginProvider, GoogleLoginProvider,
        LinkedInLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private user: SocialUser;
    //private loggedIn: boolean;
    returnUrl: string;

    //loginForm: FormGroup;
    //loading = false;
    //submitted = false;
    // alertService, formBuilder

    constructor(private authService: AuthService, private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {

        // redirect to home if already logged in
        /*
        if(this.authenticationService.currentUserValue) {
            this.router.navigate(['/home']);
        }
        */
    }

    ngOnInit() {
        /*
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        */
        this.authService.authState.subscribe((user) => {
        this.user = user;
        //this.loggedIn = (user != null);
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
        //this.user = userData;
        // wait 900ms to see the profile picture
        debounceTime(900),
        this.authenticationService.login(userData.email)
        .subscribe(
            data => this.router.navigate([this.returnUrl])
            );
        });
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
        //this.user = userData;
        this.authenticationService.login(userData.email)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            });
        });
    }

    signInWithLinkedIn(): void {
        this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then((userData) => {
        //this.user = userData;
        this.authenticationService.login(userData.email)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                });
        });
    }



    // convenience getter for easy access to form fields
    //get f() { return this.loginForm.controls; }

    /*
    signIn(): void {
        this.authenticationService.signIn().then(user => {
        this.router.navigate(['/home']);
        }).catch(error => {
            console.log(error);
        });
    }

    */

}
