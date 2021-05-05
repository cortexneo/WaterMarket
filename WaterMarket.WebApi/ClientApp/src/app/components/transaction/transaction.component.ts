import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseModalComponent } from 'app/components/transaction/pruchase-modal/pruchase-modal.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})

export class TransactionComponent implements OnInit {
  focus: any;
  focus1: any;

  successfulPurchase = false;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  openRefillModal() {
    const modalRef = this.modalService.open(PurchaseModalComponent, this.ngbModalOptions);
    modalRef.componentInstance.modalTitle = 'Refill';
    modalRef.componentInstance.customerData = history.state.data;

    modalRef.result.then((message) => {
      if (message.toUpperCase() === 'SUCCESS') this.successfulPurchase = true;
    });
  }

  openBuyModal() {
    const modalRef = this.modalService.open(PurchaseModalComponent, this.ngbModalOptions);
    modalRef.componentInstance.modalTitle = 'Buy';
    modalRef.componentInstance.customerData = history.state.data;

    modalRef.result.then((message) => {
      if (message.toUpperCase() === 'SUCCESS') this.successfulPurchase = true;
    });
  }

  closeAlert() {
    this.successfulPurchase = false;
  }
}
