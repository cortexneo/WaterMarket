import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PurchaseGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        if (!localStorage.getItem('customerName')) {
            this.router.navigate(['/home']);
        }
        return true;
    }
}