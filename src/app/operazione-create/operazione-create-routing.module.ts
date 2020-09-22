import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperazioneCreatePage } from './operazione-create.page';

const routes: Routes = [
  {
    path: '',
    component: OperazioneCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperazioneCreatePageRoutingModule {}
