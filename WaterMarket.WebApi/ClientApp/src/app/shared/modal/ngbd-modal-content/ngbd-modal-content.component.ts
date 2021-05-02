import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'app/components/components.component';

@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './ngbd-modal-content.component.html',
  styleUrls: ['./ngbd-modal-content.component.css']
})
export class NgbdModalContentComponent implements OnInit {

  @Input() modalTitle;
  @Input() customerData;

  gallonQuantity = 0;
  waterDispenserQuantity = 0;
  waterDispenserPipeQuantity = 0;
  totalAmount = 0;


  constructor(public activeModal: NgbActiveModal,
    public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }

  ngOnInit(): void {
    this.customerData;
  }

  computeGallonTotalPrice(quantity: number) {
    this.totalAmount = 100 * quantity;
    return this.totalAmount;
  }

  computeDispenserTotalPrice(waterDispenserQuantity: number, waterDispenserPipeQuantity: number) {
    let waterDispenserTotal = 150 * waterDispenserQuantity;
    let waterDispenserPipeTotal = 200 * waterDispenserPipeQuantity;
    this.totalAmount = waterDispenserTotal + waterDispenserPipeTotal;
    return this.totalAmount;
  }

  submit() {
    var order = new Order();
    order.orderedProducts = '';
    order.amount = this.totalAmount;

    if (this.modalTitle.toUpperCase() == 'REFILL') {
      if (this.gallonQuantity <= 0 || !this.gallonQuantity) return;
      order.orderedProducts = `Refilled ${this.gallonQuantity} Gallons`;
      order.amount = this.totalAmount;

      this.http.post<Order>(this.baseUrl + 'Order', order).subscribe(result => {
        if (!result) return;

        let customer = new Customer();
        customer.name = this.customerData.name;
        customer.address = this.customerData.address;
        customer.contactNumber = this.customerData.contactNumber;
        customer.orderID = result.orderID;
        this.http.post<Customer>(this.baseUrl + 'Customer', customer).subscribe(result => {
          if (!result) return;
          this.onClose('success');
        });
      }, error => console.error(error));
    } else {
      if (this.waterDispenserQuantity <= 0 && this.waterDispenserPipeQuantity <= 0) return;

      let waterDispenserMsg = this.waterDispenserQuantity > 0 ? `${this.waterDispenserQuantity} pc/s. Water Dispenser` : '';
      let waterDispenserPipeMsg = this.waterDispenserPipeQuantity > 0 ? `${this.waterDispenserPipeQuantity} pc/s. Water Dispenser w/ Pipe` : '';

      order.orderedProducts = (waterDispenserPipeMsg === '' || waterDispenserMsg === '') ?
        `${waterDispenserMsg}${waterDispenserPipeMsg}` : `${waterDispenserMsg}, ${waterDispenserPipeMsg}`
      order.amount = this.totalAmount;

      this.http.post<Order>(this.baseUrl + 'Order', order).subscribe(result => {
        if (!result) return;

        let customer = new Customer();
        customer.name = this.customerData.name;
        customer.address = this.customerData.address;
        customer.contactNumber = this.customerData.contactNumber;
        customer.orderID = result.orderID;
        this.http.post<Customer>(this.baseUrl + 'Customer', customer).subscribe(result => {
          if (!result) return;
          this.onClose('success');
        });
      }, error => console.error(error));
    }
  }

  onClose(message: string) {
    this.totalAmount = 0;
    this.gallonQuantity = 0;
    this.waterDispenserQuantity = 0;
    this.waterDispenserPipeQuantity = 0;
    this.activeModal.close(message);
  }
}

export class Order {
  orderID: string;
  orderedProducts: string;
  amount: number;
}
