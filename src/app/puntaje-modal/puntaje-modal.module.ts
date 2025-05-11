import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntajeModalPageRoutingModule } from './puntaje-modal-routing.module';

import { PuntajeModalPage } from './puntaje-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntajeModalPageRoutingModule
  ],
  declarations: [PuntajeModalPage]
})
export class PuntajeModalPageModule {}
