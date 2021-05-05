import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  @Input() customerDetails;

  customerForm: FormGroup;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.customerForm.patchValue({
      name: this.customerDetails.name,
      address: this.customerDetails.address,
      contactNumber: this.customerDetails.contactNumber,
      order: this.customerDetails.order.orderedProducts
    });
  }

  createForm(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      order: [this.customerDetails.order.orderedProducts, [Validators.required]]
    });
  }
}
