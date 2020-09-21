import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttrezzaturePage } from './attrezzature.page';

const routes: Routes = [
  {
    path: '',
    component: AttrezzaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttrezzaturePageRoutingModule {}
