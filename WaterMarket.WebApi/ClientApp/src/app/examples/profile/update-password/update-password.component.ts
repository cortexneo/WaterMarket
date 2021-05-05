import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'app/examples/signup/signup.component';
import { NgbdModalConfirm } from '../profile.component';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  userDetails: IUser;
  userForm!: FormGroup;
  invalidPassword = false;
  passwordNotMatch = false;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  constructor(private modalService: NgbModal, public modal: NgbActiveModal, private fb: FormBuilder,
    public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }

  ngOnInit(): void {
    this.createForm();
    this.getUserDetails();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

  getUserDetails() {
    this.http.get<IUser>(this.baseUrl + `User/GetUserByUsername?username=${localStorage.getItem('user')}`).subscribe(result => {
      if (!result) {
        return;
      };
      this.userDetails = result;
    }, error => console.error(error));
  }

  changePassword() {
    this.invalidPassword = false;
    this.passwordNotMatch = false;

    const controls = this.userForm.controls;
    if (this.userForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    if (this.userForm.get('oldPassword').value == this.userDetails.password) {
      this.invalidPassword = false;
      let confirmNewPassword = this.userForm.get('confirmNewPassword');
      if (confirmNewPassword.value == this.userForm.get('newPassword').value) {
        this.passwordNotMatch = false;
        const modalRef = this.modalService.open(NgbdModalConfirm, this.ngbModalOptions);
        modalRef.componentInstance.modalTitle = 'Update Password';
        modalRef.componentInstance.message = 'Are you sure you want to update password?';
        modalRef.result.then((message) => {
          if (message.toUpperCase() === 'UPDATE PASSWORD') {
            this.http.put<IUser>(this.baseUrl + `User?userID=${this.userDetails.userID}&password=${confirmNewPassword.value}`, this.userDetails).subscribe(res => {
              const modalRef = this.modalService.open(NgbdModalConfirm, this.ngbModalOptions);
              modalRef.componentInstance.modalTitle = 'User';
              modalRef.componentInstance.message = 'Successfully Updated.';
              this.modal.close('Successfully Updated');
            })
          }
        });
        return;
      }
      this.passwordNotMatch = true;
      return;
    }
    this.invalidPassword = true;
  }
}
