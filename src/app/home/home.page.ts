import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(public apiService: ApiService,private barcodeScanner: BarcodeScanner, private router: Router) { 
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  async ngOnInit() {
    await this.apiService.loadSaved();
  }

  scanCode() {
    this.barcodeScanner
        .scan()
      .then(barcodeData => {
        this.router.navigate(['/operazione-create/'+barcodeData.text]);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

}
