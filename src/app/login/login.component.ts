import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
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
    private loggedIn: boolean;

    //loginForm: FormGroup;
    //loading = false;
    //submitted = false;
    //returnUrl: string;
    
    constructor(private authService: AuthService) {
        /*
    constructor(private router: Router, 
                private route : ActivatedRoute, 
                private authenticationService: AuthenticationService,
                private formBuilder: FormBuilder) { //, private alertService: AlertService) 
        
        // redirect to home if already logged in
        /*
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/home']);
        }
        */
        
    }

    ngOnInit() {
        //this.signIn();
        /*
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        
        
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        */
    }
    
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
        this.user = userData;
        });
    }
 
    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
        this.user = userData;
        });
    }
  
    signInWithLinkedIn(): void {
        this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then((userData) => {
        this.user = userData;
        });
    }  
 
    signOut(): void {
        this.authService.signOut();
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
    
    
    
    onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    
    */

}
