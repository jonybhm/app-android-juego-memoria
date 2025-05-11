import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PuntajeModalPage } from '../puntaje-modal/puntaje-modal.page';

interface Carta 
{
  id: number;
  imagen: string;
  estado: 'oculta' | 'visible' | 'encontrada';
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  juegoIniciado = false;
  cartas: Carta[] = [];
  cartasSeleccionadas: Carta[] = [];
  puedeSeleccionar = false;
  tiempo: number = 0;
  timerInterval: any;
  juegoFinalizado = false;

  constructor(
    private modalController: ModalController

  ) {
  }

  empezarJuego(dificultad: 'facil' | 'medio' | 'dificil') 
  {
    let cantidadPares = 3;
    let imagenes = 
    [
      '../../assets/facil/1.png',
      '../../assets/facil/2.png',
      '../../assets/facil/3.png',
    ];

    if (dificultad === 'medio') 
      {
        cantidadPares = 4;
        imagenes = 
        [
          '../../assets/medio/1.png',
          '../../assets/medio/2.png',
          '../../assets/medio/3.png',
          '../../assets/medio/4.png',
          '../../assets/medio/5.png',
        ];
      }

    if (dificultad === 'dificil')
      {
        cantidadPares = 8;
        imagenes = 
        [
          '../../assets/dificil/1.png',
          '../../assets/dificil/2.png',
          '../../assets/dificil/3.png',
          '../../assets/dificil/4.png',
          '../../assets/dificil/5.png',
          '../../assets/dificil/6.png',
          '../../assets/dificil/7.png',
          '../../assets/dificil/8.png',
        ];
      } 

    

    const pares = [...imagenes, ...imagenes]
      .map((img, idx) => ({ id: idx, imagen: img, estado: 'visible' as 'visible' }))
      .sort(() => Math.random() - 0.5);

    this.cartas = pares;
    this.juegoIniciado = true;
    this.tiempo = 0;
    this.timerInterval = setInterval(() => {
      this.tiempo++;
    }, 1000);

    setTimeout(() => {
      this.cartas.forEach(c => c.estado = 'oculta');
      this.puedeSeleccionar = true;
    }, 3000);

  }

  seleccionarCarta(carta: Carta) 
  {
    if (!this.puedeSeleccionar || carta.estado !== 'oculta' || this.cartasSeleccionadas.length >= 2) 
    {
        return;
    }

    carta.estado = 'visible';
    this.cartasSeleccionadas.push(carta);

    if (this.cartasSeleccionadas.length === 2) 
    {
      this.puedeSeleccionar = false;
      setTimeout(() => this.verificarPar(), 1000);
    }

    
  }

  verificarPar() 
  {
    const [c1, c2] = this.cartasSeleccionadas;
    if (c1.imagen === c2.imagen) 
    {
      c1.estado = 'encontrada';
      c2.estado = 'encontrada';
    } 
    else 
    {
      c1.estado = 'oculta';
      c2.estado = 'oculta';
    }
    this.cartasSeleccionadas = [];
    this.puedeSeleccionar = true;

    if (this.cartas.every(c => c.estado === 'encontrada')) {
      clearInterval(this.timerInterval);
      this.juegoFinalizado = true;
      this.mostrarPuntaje();
    }
  }

  reiniciarJuego() 
  {
    this.juegoIniciado = false;
    this.cartas = [];
    this.cartasSeleccionadas = [];
    this.puedeSeleccionar = false;
    this.tiempo = 0;
    if (this.timerInterval) clearInterval(this.timerInterval);
  } 



  async mostrarPuntaje() {
    const modal = await this.modalController.create({
      component: PuntajeModalPage,
      componentProps: { tiempo: this.tiempo }
    });
  
    this.juegoFinalizado = false;
    
    return await modal.present();

  }
}
