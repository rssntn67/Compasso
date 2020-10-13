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

  cantData: any;
  data: Operabile;
  id: string;
  operabileIcon: string;

  constructor(public apiService: ApiService,public activatedRoute: ActivatedRoute,
    public router: Router) { 
    this.cantData=[];
    this.data = new Operabile();
    this.operabileIcon='checkmark-circle';
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.apiService.getAttrezzatura(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
      if(this.data.stato.indexOf('Disponibile') >= 0) this.operabileIcon='checkmark-circle';
      else this.operabileIcon='stopwatch';
    
    })
    this.getCantieri();
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
      this.cantData = response;
    })  
  }

  carica(cantiereId:string) {
    const operazione = new Operazione(cantiereId,this.data.identificativo,'Carico');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  scarica() {
    const operazione = new Operazione(null,this.data.identificativo,'Scarico');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  rubato() {
    const operazione = new Operazione(null,this.data.identificativo,'Furto');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  rotto() {
    const operazione = new Operazione(null,this.data.identificativo,'Rottura');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }

  smarrito() {
    const operazione = new Operazione(null,this.data.identificativo,'Smarrimento');
  
    this.apiService.creaOperazione(operazione).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['attrezzature']);
  }


}
