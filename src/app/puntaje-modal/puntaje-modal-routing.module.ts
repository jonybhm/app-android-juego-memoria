import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntajeModalPage } from './puntaje-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PuntajeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntajeModalPageRoutingModule {}
