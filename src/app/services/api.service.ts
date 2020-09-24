import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Operabile } from '../models/operabile'
import { Cantiere } from '../models/cantiere'
import { Operazione } from '../models/operazione';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  attr_path = '/api/attrezzature';
  cant_path = '/api/cantieri';
  op_attr_path = '/api/operazione/attrezzatura';
  config = new Config('http://localhost:8080','nokey');
  
  constructor(private http: HttpClient) { 
    console.log(this.config)
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  creaOperazione(item): Observable<boolean> {
    return this.http
      .post<boolean>(this.config.baseUrl+this.op_attr_path, JSON.stringify(item), this.httpOptions)
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
    console.log(this.config)
    return this.http
      .get<Operabile>(this.config.baseUrl+this.attr_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAttrezzatura(id): Observable<Operabile> {
    return this.http
      .get<Operabile>(this.config.baseUrl+this.attr_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  setConfig(config) {
    this.config=config;
  }

  getConfig(): Config {
    return this.config;
  }

  getCantieri(): Observable<Cantiere> {
    return this.http
      .get<Cantiere>(this.config.baseUrl+this.cant_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
