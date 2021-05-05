import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { PurchaseModalComponent } from 'app/components/transaction/pruchase-modal/pruchase-modal.component';
import { UpdateProfileComponent } from './admin/update-profile/update-profile.component';
import { UpdatePasswordComponent } from './admin/update-password/update-password.component';
import { HttpClientModule } from '@angular/common/http';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        ReactiveFormsModule
    ],
    declarations: [
        ComponentsComponent,
        TransactionComponent,
        SigninComponent,
        AdminComponent,
        PurchaseModalComponent,
        UpdateProfileComponent,
        UpdatePasswordComponent
    ],
    entryComponents: [PurchaseModalComponent],
    providers: [NgbActiveModal],
    exports: [ComponentsComponent],
})
export class ComponentsModule { }
