import { Component, OnInit } from '@angular/core';
import { query, collection, Firestore, orderBy, collectionData, where } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { doc, updateDoc, arrayUnion, increment,arrayRemove,deleteDoc, limit  } from 'firebase/firestore';
import { SpinnerService } from '../servicios/spinner.service';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {

    
  sub!: Subscription;
  mejoresTiempos: any[] = [];
  constructor(
    private firestore: Firestore,
    private spinner:SpinnerService

  ) { }

  ngOnInit() {

    this.spinner.show();
    
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    this.obtenerItemsCosasDB('resultadosMemoria');

  }

  obtenerItemsCosasDB(nombre_lista:string) {
    const coleccion = collection(this.firestore, nombre_lista);
    const q = query(coleccion, orderBy('tiempo', 'asc'), limit(5));
  
    const observable = collectionData(q, { idField: 'id' });
  
    observable.subscribe((datos) => {

        this.mejoresTiempos = datos;

      console.log('items', datos);
    });
  }
}
