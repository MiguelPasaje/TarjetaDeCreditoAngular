import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TarjetaCredito } from '../models/TarjetaCredito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(
    private firebase: AngularFirestore
  ) { }

  guardarTarjeta(tarjeta:TarjetaCredito):Promise<any>{
    return this.firebase.collection('tarjetas').add(tarjeta)
  }

  obtenerTarjetas():Observable<any>{
    return this.firebase.collection('tarjetas').snapshotChanges()
  }
}
