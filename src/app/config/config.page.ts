import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Config } from '../models/config';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  config: Config;
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.config = this.apiService.getConfig();
  }

  update() {
    this.apiService.setConfig(this.config);
  }

}
