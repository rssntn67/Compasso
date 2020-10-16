import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Operabile } from '../models/operabile';

@Component({
  selector: 'app-attrezzature',
  templateUrl: './attrezzature.page.html',
  styleUrls: ['./attrezzature.page.scss'],
})
export class AttrezzaturePage implements OnInit {

  attrezzature: any;
  attrezzatureAll: any;

  constructor(public apiService: ApiService) { 
    this.attrezzature = [];
    this.attrezzatureAll = [];
  }
  

  async ngOnInit() {
    await this.apiService.loadSaved();
  }

  async ionViewDidEnter() {
    await this.getAttrezzature();
  }
  
  getIcon(operabile: Operabile){
    if(operabile.stato.indexOf('Disponibile') >= 0) return 'checkmark-circle';
    else return 'stopwatch';
  }

  async getAttrezzature() {
    //Get saved list of students
    await this.apiService.getAttrezzature().subscribe(response => {
      console.log(response);
      this.attrezzatureAll = response;
      this.attrezzature = this.attrezzatureAll;
    })  
  }

  async filterList(evt) {
    const search = evt.srcElement.value;
    this.attrezzature=this.attrezzatureAll;
  
    if (!search) {
      return;
    }

  
    this.attrezzature = this.attrezzature.filter(a => {
      if (a.identificativo.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            a.modello.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            a.stato.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            return true
        }
    });
  }

}
