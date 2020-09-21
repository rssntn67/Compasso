import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttrezzaturePageRoutingModule } from './attrezzature-routing.module';

import { AttrezzaturePage } from './attrezzature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttrezzaturePageRoutingModule
  ],
  declarations: [AttrezzaturePage]
})
export class AttrezzaturePageModule {}
