import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Order } from 'app/shared/modal/ngbd-modal-content/ngbd-modal-content.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    page = 1;
    pageSize = 4;
    collectionSize = COUNTRIES.length;
    countries: Country[];
    customers: ICustomer[];

    constructor(public http: HttpClient,
        @Inject('BASE_URL') public baseUrl: string) { }

    ngOnInit() {
        this.getCustomers();
        this.refreshCountries();
    }

    getCustomers() {
        this.http.get<ICustomer[]>(this.baseUrl + 'Customer').subscribe(result => {
            if (!result) return;
            this.customers = result.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        }, error => console.error(error));
    }

    refreshCountries() {
        this.countries = COUNTRIES
            .map((country, i) => ({ id: i + 1, ...country }))
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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

interface Country {
    id?: number;
    name: string;
    flag: string;
    area: number;
    population: number;
}

const COUNTRIES: Country[] = [
    {
        name: 'Russia',
        flag: 'f/f3/Flag_of_Russia.svg',
        area: 17075200,
        population: 146989754
    },
    {
        name: 'France',
        flag: 'c/c3/Flag_of_France.svg',
        area: 640679,
        population: 64979548
    },
    {
        name: 'Germany',
        flag: 'b/ba/Flag_of_Germany.svg',
        area: 357114,
        population: 82114224
    },
    {
        name: 'Portugal',
        flag: '5/5c/Flag_of_Portugal.svg',
        area: 92090,
        population: 10329506
    },
    {
        name: 'Canada',
        flag: 'c/cf/Flag_of_Canada.svg',
        area: 9976140,
        population: 36624199
    },
    {
        name: 'Vietnam',
        flag: '2/21/Flag_of_Vietnam.svg',
        area: 331212,
        population: 95540800
    },
    {
        name: 'Brazil',
        flag: '0/05/Flag_of_Brazil.svg',
        area: 8515767,
        population: 209288278
    },
    {
        name: 'Mexico',
        flag: 'f/fc/Flag_of_Mexico.svg',
        area: 1964375,
        population: 129163276
    },
    {
        name: 'United States',
        flag: 'a/a4/Flag_of_the_United_States.svg',
        area: 9629091,
        population: 324459463
    },
    {
        name: 'India',
        flag: '4/41/Flag_of_India.svg',
        area: 3287263,
        population: 1324171354
    },
    {
        name: 'Indonesia',
        flag: '9/9f/Flag_of_Indonesia.svg',
        area: 1910931,
        population: 263991379
    },
    {
        name: 'Tuvalu',
        flag: '3/38/Flag_of_Tuvalu.svg',
        area: 26,
        population: 11097
    },
    {
        name: 'China',
        flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
        area: 9596960,
        population: 1409517397
    }
];
