import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperazioneCreatePageRoutingModule } from './operazione-create-routing.module';

import { OperazioneCreatePage } from './operazione-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperazioneCreatePageRoutingModule
  ],
  declarations: [OperazioneCreatePage]
})
export class OperazioneCreatePageModule {}
