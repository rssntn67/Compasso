import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public apiService: ApiService) { }

  async ngOnInit() {
    await this.apiService.loadSaved();
  }
}
