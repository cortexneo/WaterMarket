import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirm } from 'app/examples/profile/profile.component';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {
    constructor(private router: Router, private modalService: NgbModal) { }

    ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false
    };

    canActivate() {
        if (this.router.url.toUpperCase() === '/USER-PROFILE') {
            const modalRef = this.modalService.open(NgbdModalConfirm, this.ngbModalOptions);
            modalRef.componentInstance.modalTitle = 'Log out';
            modalRef.componentInstance.message = 'Are you sure you want to log out?';

            modalRef.result.then((message) => {
                if (message.toUpperCase() === 'LOG OUT') {
                    this.router.navigate(['/home'])
                }
            });
        }
        return false;
    }
}