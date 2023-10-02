import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { CrearTarjetaComponent } from './components/crear-tarjeta/crear-tarjeta.component';
import { ListarTarjetaComponent } from './components/listar-tarjeta/listar-tarjeta.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, CrearTarjetaComponent, ListarTarjetaComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    /* provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()) */
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
