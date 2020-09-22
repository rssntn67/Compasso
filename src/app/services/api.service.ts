import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Operabile } from '../models/operabile'
import { Cantiere } from '../models/cantiere'
import { Operazione } from '../models/operazione';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  attr_path = 'http://localhost:8080/api/attrezzature';
  cant_path = 'http://localhost:8080/api/cantieri';
  op_attr_path = 'http://localhost:8080/api/operazione/attrezzatura';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  creaOperazione(item): Observable<boolean> {
    return this.http
      .post<boolean>(this.op_attr_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getAttrezzature(): Observable<Operabile> {
    return this.http
      .get<Operabile>(this.attr_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAttrezzatura(id): Observable<Operabile> {
    return this.http
      .get<Operabile>(this.attr_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  getCantieri(): Observable<Cantiere> {
    return this.http
      .get<Cantiere>(this.cant_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
