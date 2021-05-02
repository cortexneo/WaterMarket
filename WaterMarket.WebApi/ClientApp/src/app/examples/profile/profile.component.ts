import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'app/shared/modal/ngbd-modal-content/ngbd-modal-content.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    page = 1;
    pageSize = 4;
    collectionSize: number;
    customers: ICustomer[];

    ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false
    };

    constructor(public http: HttpClient,
        @Inject('BASE_URL') public baseUrl: string, public router: Router,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.getCustomers();
    }

    getCustomers() {
        this.http.get<ICustomer[]>(this.baseUrl + 'Customer').subscribe(result => {
            if (!result) return;
            this.collectionSize = result.length;
            this.customers = result.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }, error => console.error(error));
    }

    logout() {
        const modalRef = this.modalService.open(NgbdModalConfirm, this.ngbModalOptions);
        modalRef.result.then((message) => {
            if (message.toUpperCase() === 'LOGOUT') {
                this.router.navigate(['/home'])
            }
        });
    }
}

export interface ICustomer {
    customerID: string;
    name: string;
    address: string;
    contactNumber: string;
    orderID: string;
    order: Order;
}

@Component({
    selector: 'ngbd-modal-confirm',
    template: `
    <div class="modal-header" style="padding-top: 0 !important;">
      <h4 class="modal-title" id="modal-title">Log out</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('cancel')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Are you sure you want to logout?</strong></p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" style="background-color: #66615B !important" (click)="modal.dismiss('cancel')">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="modal.close('logout')">Ok</button>
    </div>
    `
})
export class NgbdModalConfirm {
    constructor(public modal: NgbActiveModal) { }
}