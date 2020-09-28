import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AlertController, ToastController} from "@ionic/angular";
import {Observable, of} from "rxjs";
import {Order} from "../../models/order.model";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = environment.url;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private ordersUrl = this.url + '/api/orders';

  constructor(private http: HttpClient,
              private alertController: AlertController,
              private toastController: ToastController) {
  }

  getOrders(page): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.ordersUrl}/${page}`)
        .pipe(
            map(data => data['result'].map((order: Order) => new Order().deserialize(order))),
            catchError(this.handleError<Order[]>('getOrders', []))
        );
  }

  getOrder(id): Observable<Order> {
    const url = `${this.url}/api/order/${id}`;
    return this.http.get<Order>(url).pipe(
        map((order: Order) => new Order().deserialize(order)),
        catchError(this.handleError<Order>(`Get order id=${id}`))
    )
  }

  addOrder(data): Observable<any> {
    return this.http.post<any>(this.ordersUrl, data, this.httpOptions).pipe(
        tap(res => {
          return this.toastController.create({
            message: 'Order was added successfully',
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

  editOrder(id, data): Observable<any> {
    const url = `${this.url}/api/order/${id}`;
    return this.http.put<any>(url, data, this.httpOptions).pipe(
        tap(res => {
          console.log('Order edited:' + data);
        }),
        catchError(this.handleError<any>(''))
    )
  }

  deleteOrder(id): Observable<any> {
    const url = `${this.ordersUrl}/${id}`;

    return this.http.delete<any>(url).pipe(
        tap(result => {
          return this.toastController.create({
            message: 'Order was deleted successfully',
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
