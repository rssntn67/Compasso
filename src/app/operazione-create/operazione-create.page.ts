import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Cantiere} from '../models/cantiere';
import { Operabile } from '../models/operabile';
import { Operazione } from '../models/operazione';


@Component({
  selector: 'app-operazione-create',
  templateUrl: './operazione-create.page.html',
  styleUrls: ['./operazione-create.page.scss'],
})
export class OperazioneCreatePage implements OnInit {

  cantieri: any;
  cantieriAll: any;
  operabile: Operabile;
  id: string;
  operabileIcon: string;

  constructor(public apiService: ApiService,public activatedRoute: ActivatedRoute,
    public router: Router) { 
    this.cantieri=[];
    this.cantieriAll=[];
    this.operabile = new Operabile();
    this.operabileIcon='checkmark-circle';
  }

  async ngOnInit() {
    await this.apiService.loadSaved();
  }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.apiService.getAttrezzatura(this.id).subscribe(response => {
      console.log(response);
      this.operabile = response;
      if(this.operabile.stato.indexOf('Disponibile') >= 0) this.operabileIcon='checkmark-circle';
      else this.operabileIcon='stopwatch';
      this.getCantieri();
      },
      (error) => { this.router.navigate(['operazione-create-error/'+this.id])})
  }

  getOperabileIcon() {
    return this.operabileIcon;
  }

  getIcon(cantiere: Cantiere){
    if(cantiere.stato.indexOf('InOpera') >= 0) return 'checkmark-circle';
    else return 'stopwatch';
  }

  getCantieri() {
    //Get saved list of students
    this.apiService.getCantieri().subscribe(response => {
      console.log(response);
      this.cantieriAll = response;
      this.cantieri=this.cantieriAll;
    })  
  }

  carica(cantiereId:string) {
    const operazione = new Operazione(cantiereId,this.operabile.identificativo,'Carico');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  scarica() {
    const operazione = new Operazione(null,this.operabile.identificativo,'Scarico');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  rubato() {
    const operazione = new Operazione(null,this.operabile.identificativo,'Furto');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  rotto() {
    const operazione = new Operazione(null,this.operabile.identificativo,'Rottura');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  smarrito() {
    const operazione = new Operazione(null,this.operabile.identificativo,'Smarrimento');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  async filterList(evt) {
    const search = evt.srcElement.value;
    this.cantieri=this.cantieriAll;
  
    if (!search) {
      return;
    }

  
    this.cantieri = this.cantieri.filter(c => {
      if (c.identificativo.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            c.tipo.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            c.sitoIn.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            c.stato.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            return true
        }
    });
  }


}
