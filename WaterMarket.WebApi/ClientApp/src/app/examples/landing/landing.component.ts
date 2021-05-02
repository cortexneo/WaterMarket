import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContentComponent } from 'app/shared/modal/ngbd-modal-content/ngbd-modal-content.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
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
    const modalRef = this.modalService.open(NgbdModalContentComponent, this.ngbModalOptions);
    modalRef.componentInstance.modalTitle = 'Refill';
    modalRef.componentInstance.customerData = history.state.data;

    modalRef.result.then((message) => {
      if (message.toUpperCase() === 'SUCCESS') this.successfulPurchase = true;
    });
  }

  openBuyModal() {
    const modalRef = this.modalService.open(NgbdModalContentComponent, this.ngbModalOptions);
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
