import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { PurchaseGuard } from './guards/purchase.guard';
import { AdminComponent } from './components/admin/admin.component';
import { SigninComponent } from './components/signin/signin.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ComponentsComponent },
  { path: 'user-profile', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'purchase', component: TransactionComponent, canActivate: [PurchaseGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
