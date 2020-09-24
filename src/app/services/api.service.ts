import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Operabile } from '../models/operabile'
import { Cantiere } from '../models/cantiere'
import { Operazione } from '../models/operazione';
import { Config } from '../models/config';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const {Filesystem} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  attr_path = '/api/attrezzature';
  cant_path = '/api/cantieri';
  op_attr_path = '/api/operazione/attrezzatura';
  config = new Config('http://localhost:8080','nokey');
  
  constructor(private http: HttpClient) { 
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

   async saveConfig(config: Config) {
    try {
      const result = await Filesystem.writeFile({
        path: 'secrets/config.json',
        data: JSON.stringify(config),
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      })
      this.config=config;
      console.log('Wrote file', result, this.config);
    } catch(e) {
      console.error('Unable to write file', e);
    }

  }

  async loadSaved() {
    try {
      let ret = await Filesystem.stat({
        path: 'secrets/config.json',
        directory: FilesystemDirectory.Data
      });
      const readFile = await Filesystem.readFile({
        path: 'secrets/config.json',
        directory: FilesystemDirectory.Data
      });
      this.config = JSON.parse(readFile.data);
      console.log('loadSaved: from cache', this.config);
    } catch(e) {
      this.saveConfig(this.config);
      console.log('loadSaved: from default', this.config);
    }
  }


}
