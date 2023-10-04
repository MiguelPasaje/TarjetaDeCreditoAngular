import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css'],
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  titulo: string = 'Agregar Tarjeta';
  id: string | undefined;

  constructor(
    private fb: FormBuilder,
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe((data) => {
      console.log(data);
      this.id = data.id;
      this.titulo = 'Editar Tarjeta';
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv,
      });
    });
  }

  guardarTarjeta() {
    if (this.id === undefined) {
      //creamos tarjeta
      this.agregarTarjeta();
    } else {
      //editar tarjeta
      this.editarTarjeta(this.id);
    }
  }

  agregarTarjeta() {
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    console.log(TARJETA);
    this.loading = true;
    this._tarjetaService.guardarTarjeta(TARJETA).then(
      () => {
        console.log('success');
        this.toastr.success('registro exitoso', 'Tarjeta Registrada');
        this.form.reset();
        this.loading = false;
      },
      (err) => {
        console.log(err, 'error al adicionar tarjeta');
        this.toastr.error('opps..', 'Error');
        this.loading = false;
      }
    );
  }
  editarTarjeta(id: string) {
    this.loading = true;
    const TARJETA: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date(),
    };
    this._tarjetaService.editarTarjeta(id, TARJETA).then(
      () => {
        this.loading = false;
        this.titulo = 'Agregar Tarjeta';
        this.form.reset();
        this.id = undefined;
        this.toastr.info('la tarjeta fue actualizada', 'OK');
      },
      (error) => {
        this.toastr.error(error, 'OK');
      }
    );
  }
}
