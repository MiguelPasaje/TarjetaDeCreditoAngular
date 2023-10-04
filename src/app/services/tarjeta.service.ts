import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TarjetaCredito } from '../models/TarjetaCredito';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjeta$ = new Subject<any>()

  constructor(
    private firebase: AngularFirestore
  ) { }

  guardarTarjeta(tarjeta:TarjetaCredito):Promise<any>{
    return this.firebase.collection('tarjetas').add(tarjeta)
  }

  obtenerTarjetas():Observable<any>{
    return this.firebase.collection('tarjetas',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges()
  }

  eliminarTarjeta(id:string):Promise<any>{
    return this.firebase.collection('tarjetas').doc(id).delete()
  }

  addTrajetaEdit(tarjeta:TarjetaCredito){
    this.tarjeta$.next(tarjeta)
  }

  getTarjetaEdit():Observable<TarjetaCredito>{
    return this.tarjeta$.asObservable()
  }

  editarTarjeta(id:string, tarjeta:any):Promise<any>{
    return this.firebase.collection('tarjetas').doc(id).update(tarjeta)
  }
}
