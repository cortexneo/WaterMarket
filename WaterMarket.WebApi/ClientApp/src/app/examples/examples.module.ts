import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { NgbdModalContentComponent } from 'app/shared/modal/ngbd-modal-content/ngbd-modal-content.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { UpdatePasswordComponent } from './profile/update-password/update-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        NgbdModalContentComponent,
        UpdateProfileComponent,
        UpdatePasswordComponent
    ],
    entryComponents: [NgbdModalContentComponent],
    providers: [NgbActiveModal]
})
export class ExamplesModule { }
