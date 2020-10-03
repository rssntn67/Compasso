import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Operabile } from '../models/operabile'
import { Cantiere } from '../models/cantiere'
import { Operazione } from '../models/operazione';
import { Config } from '../models/config';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private CONFIG_STORAGE: string = "CompassoConfiguration";
  private attr_path: string = '/api/attrezzature';
  private cant_path: string  = '/api/cantieri';
  private op_attr_path: string = '/api/operazione/attrezzatura';
  private config: Config;
  
  constructor(private http: HttpClient) { 
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  }

  creaOperazione(item:Operazione): Observable<boolean> {
    item.setApiKey(this.config.apiKey);
    console.log(item);
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
      .get<Operabile>(this.config.baseUrl+this.attr_path, {params: new HttpParams().set('apikey',this.config.apiKey)})
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAttrezzatura(id): Observable<Operabile> {
    return this.http
      .get<Operabile>(this.config.baseUrl+this.attr_path + '/' + id, {params: new HttpParams().set('apikey',this.config.apiKey)})
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
      .get<Cantiere>(this.config.baseUrl+this.cant_path, {params: new HttpParams().set('apikey',this.config.apiKey)})
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   async saveConfig(config: Config) {
     await Storage.set({key: this.CONFIG_STORAGE,
      value: JSON.stringify(config)});
      this.config=config;
      console.log(this.config);
  }

  async loadSaved() {
    const savedConfig = await Storage.get({key: this.CONFIG_STORAGE});
    this.saveConfig(JSON.parse(savedConfig.value) || new Config('http://localhost:8080','nokey'));
  }

}
