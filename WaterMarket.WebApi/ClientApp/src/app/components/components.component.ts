import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {

    customerForm!: FormGroup;

    constructor(private fb: FormBuilder, public router: Router,
        public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }

    ngOnInit() {
        localStorage.clear();
        this.createForm();
    }

    createForm(): void {
        this.customerForm = this.fb.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            contactNumber: ['', [Validators.required]],
        });
    }

    submit() {
        const controls = this.customerForm.controls;
        if (this.customerForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        var customer = new Customer();
        customer.name = this.customerForm.get('name').value;
        customer.address = this.customerForm.get('address').value;
        customer.contactNumber = this.customerForm.get('contactNumber').value;

        localStorage.setItem('customerName', customer.name);
        this.router.navigate(['/purchase'], { state: { data: customer } })

        // this.http.post<Customer>(this.baseUrl + 'Customer', customer).subscribe(result => {
        //     if (!result) return;
        //     this.router.navigate(['/purchase'], { state: { data: customer } })
        // }, error => console.error(error));
    }
}

export class Customer {
    name: string;
    address: string;
    contactNumber: string;
    orderID: string;
}
