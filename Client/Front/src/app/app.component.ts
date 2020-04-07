import { Component } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const usersApiUrl = 'http://localhost:8000/api/workers'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  workers: any[] = [];
  constructor(
    private platform: Platform, private http: HttpClient) {
    this.getUsers()
        .subscribe((res: any) => {
          this.workers = res;
          console.log(this.workers);
        }, err => {
            console.log(err);
        });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return ( error: any): Observable<T> => {
      console.error(error);

      return of (result as T);
    };
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any>(usersApiUrl)
        .pipe(
            tap(user => console.log('otrzymani użytkownicy')),
            catchError(this.handleError('getUsers',[]))
        );
  }
  getUser(id: number): Observable<any[]> {
    const url = `${usersApiUrl}/${id}`;
    return this.http.get<any>(url)
        .pipe(
        tap( _ => console.log(`Otrzymany użytkownik o id: ${id}`)),
            catchError(this.handleError(`getUser id: ${id}`,[]))
        );
  }
}
