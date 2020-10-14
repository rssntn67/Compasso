import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperazioneCreateErrorPage } from './operazione-create-error.page';

const routes: Routes = [
  {
    path: '',
    component: OperazioneCreateErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperazioneCreateErrorPageRoutingModule {}
