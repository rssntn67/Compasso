import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Operabile } from '../models/operabile';

@Component({
  selector: 'app-attrezzature',
  templateUrl: './attrezzature.page.html',
  styleUrls: ['./attrezzature.page.scss'],
})
export class AttrezzaturePage implements OnInit {

  attrData: any;

  constructor(public apiService: ApiService) { 
    this.attrData = [];
  }
  

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.getAttrezzature();
  }
  
  getIcon(operabile){
    if(operabile.stato.indexOf('Disponibile') >= 0) return 'checkmark-circle';
    else return 'stopwatch';
  }

  async getAttrezzature() {
    //Get saved list of students
    await this.apiService.getAttrezzature().subscribe(response => {
      console.log(response);
      this.attrData = response;
    })  
  }

}
