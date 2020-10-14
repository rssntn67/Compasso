import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperazioneCreateErrorPageRoutingModule } from './operazione-create-error-routing.module';

import { OperazioneCreateErrorPage } from './operazione-create-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperazioneCreateErrorPageRoutingModule
  ],
  declarations: [OperazioneCreateErrorPage]
})
export class OperazioneCreateErrorPageModule {}
