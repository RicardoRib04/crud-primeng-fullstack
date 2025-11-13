import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../models/pet';

@Injectable()
export class PetService {
    constructor(private http: HttpClient) { }

    getPetsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }

    getPets() {
        return this.http.get<any>('assets/demo/data/pet.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }

        getPets2() {
        return this.http.get<any>('assets/demo/data/pet.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }

    getPetsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }

    getPetsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Pet[])
            .then(data => data);
    }
}
