import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

  constructor (private formBuilder: FormBuilder, 
               private userService: UserService,
                private authenticationService: AuthenticationService,
               private router: Router) {
      
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        //title:  ['', [Validators.required, Validators.minLength(10), Validators.minLength(50)]]
        name:     ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email:    ['', Validators.required],
        birthday: ['', Validators.required],
    });
  }
    
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    
    
     onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            //return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }

}
