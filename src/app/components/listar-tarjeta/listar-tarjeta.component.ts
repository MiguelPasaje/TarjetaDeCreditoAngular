import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css'],
})
export class ListarTarjetaComponent implements OnInit {
  listTarjetas: TarjetaCredito[] = [];

  constructor(
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.obtenerTarjetas().subscribe((data) => {
      this.listTarjetas = [];
      data.forEach((element: any) => {
        this.listTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.listTarjetas);
    });
  }

  eliminarTarjeta(id: any) {
    this._tarjetaService.eliminarTarjeta(id).then(
      () => {
        this.toastr.success('La tarjeta se elimino con exito','Registro Eliminado')
      },
      (error) => {
        this.toastr.success('Oppss.. Error','Registro no Eliminado')
      }
    );
  }

  editarTarjeta(tarjeta:TarjetaCredito){
    this._tarjetaService.addTrajetaEdit(tarjeta)
  }

  
}
