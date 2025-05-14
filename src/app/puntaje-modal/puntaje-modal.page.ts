import { Component, Input, OnInit } from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { ModalController } from '@ionic/angular';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { SonidosService } from '../servicios/sonidos.service';
@Component({
  selector: 'app-puntaje-modal',
  templateUrl: './puntaje-modal.page.html',
  styleUrls: ['./puntaje-modal.page.scss'],
  standalone:false
})
export class PuntajeModalPage implements OnInit {

  @Input() tiempo: number = 0;

  constructor(
    private modalCtrl: ModalController,
    public auth:Auth,
    private firestore: Firestore,
    private sonido: SonidosService

  ) {}

ngOnInit(): void {
  this.sonido.ejecutarSonido('victoria')
}

  guardarResultado() 
  {
    const fecha = new Date();
    const data = {
      tiempo: this.tiempo,
      fecha: fecha.toISOString(),
      usuario: this.auth.currentUser?.email
    };
  
    const dbInstance = collection(this.firestore, 'resultadosMemoria');
    addDoc(dbInstance, data).then(() => {
      this.modalCtrl.dismiss();

    });
  }

}
