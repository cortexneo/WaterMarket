import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    user: IUser;
    adminForm!: FormGroup;
    hasFormErrors = false;

    constructor(private fb: FormBuilder, public http: HttpClient,
        @Inject('BASE_URL') public baseUrl: string, public router: Router) { }

    ngOnInit() {
        this.createForm();
    }


    createForm(): void {
        this.adminForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    signIn() {
        const controls = this.adminForm.controls;
        if (this.adminForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );

            this.hasFormErrors = true;
            return;
        }

        let username = this.adminForm.get('username').value
        let password = this.adminForm.get('password').value

        this.http.get<IUser>(this.baseUrl + `User?username=${username}&password=${password}`).subscribe(result => {
            if (!result) {
                this.hasFormErrors = true;
                return;
            };
            this.user = result;
            localStorage.setItem('user', username);
            this.router.navigate(['/user-profile'])
        }, error => console.error(error));
    }

    closeAlert() {
        this.hasFormErrors = false;
    }
}

export interface IUser {
    userID: string;
    username: string;
    password: string;
}
