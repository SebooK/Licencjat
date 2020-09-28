import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import {environment} from "../../../environments/environment";
import {AlertController} from "@ionic/angular";
import {tap, catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Customer} from "../../models/customer.model";

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    url = environment.url;
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    private customersUrl = this.url + '/api/customers';


    constructor(
        private http: HttpClient,
        private alertController: AlertController,
        private toastController: ToastController) {
    }

    getCustomers(page): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.customersUrl}/${page}`)
            .pipe(
                map(data => data['result'].map((customer: Customer) => new Customer().deserialize(customer))),
                catchError(this.handleError<Customer[]>('getCustomers', []))
            )
    }

    getCustomer(id): Observable<Customer> {
        const url = `${this.url}/api/customer/${id}`;
        return this.http.get<Customer>(url).pipe(
            map((customer: Customer) => new Customer().deserialize(customer)),
            catchError(this.handleError<Customer>(`Get Customer id=${id}`))
        )
    }

    addCustomer(data): Observable<any> {
        return this.http.post<any>(this.customersUrl, data, this.httpOptions).pipe(
            tap(res => {
                return this.toastController.create({
                    message: 'Customer was added successfully',
                    duration: 3000,
                    position: 'top',
                    color: "success"
                }).then(toast => {
                    toast.present();
                })
            }),
            catchError(this.handleError<any>(''))
        )
    }

    editCustomer(id, data): Observable<any> {
        const url = `${this.url}/api/customer/${id}`;
        return this.http.put<any>(url, data, this.httpOptions).pipe(
            tap(res => {
                console.log('Customer edited:' + res);
                return this.toastController.create({
                    message: 'Customer was edited successfully',
                    duration: 3000,
                    position: 'top',
                    color: "success"
                }).then(toast => {
                    toast.present();
                })
            }),
            catchError(this.handleError<any>(''))
        )
    }

    deleteCustomer(id): Observable<any> {
        const url = `${this.customersUrl}/${id}`;

        return this.http.delete<any>(url).pipe(
            tap(result => {
                return this.toastController.create({
                    message: 'Customer was deleted successfully',
                    duration: 3000,
                    position: 'top',
                    color: "success"
                }).then(toast => {
                    toast.present();
                })
            }),
            catchError(this.handleError<any>(''))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.toastController.create({
                header: 'Error',
                message: error,
                color: 'danger',
                duration: 3000,
                position: "top"
            }).then(r => r.present());
            console.log(error);
            return of(result as T);
        }
    }
}
