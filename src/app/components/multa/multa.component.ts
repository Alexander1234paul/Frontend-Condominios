import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelMonto } from 'src/app/modelos/adminitración/monto';
import { ModelMulta } from 'src/app/modelos/Contabilidad/multa';
import { ModelResidenteI } from 'src/app/modelos/modelo.residente';
import { ModelPersona } from 'src/app/modelos/persona/persona.module';
import { MontoService } from 'src/app/servicios/monto/monto.service';
import { MultaService } from 'src/app/servicios/multa/multa.service';
import { ResidenteService } from 'src/app/servicios/residente/residente.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-multa',
  templateUrl: './multa.component.html',
  styleUrls: ['./multa.component.css']
})
export class MultaComponent implements OnInit {

  multas: ModelMulta[] = [];
  montos: ModelMonto[] = [];
  residentes: ModelResidenteI[] = [];

  formMulta = new FormGroup({

    res_id: new FormControl('', Validators.required),
    mul_descripcion: new FormControl('', Validators.required),

    mul_total: new FormControl('', Validators.required),
  });

  formMultaUpdate = new FormGroup({
    mul_id: new FormControl('', Validators.required),
    mon_id: new FormControl('', Validators.required),
    res_id: new FormControl('', Validators.required),
    mul_descripcion: new FormControl('', Validators.required),
    mul_fecha: new FormControl('', Validators.required),
    mul_total: new FormControl('', Validators.required),
    mul_estado: new FormControl('', Validators.required),
  });

  constructor(private multaService: MultaService, private montoService: MontoService,
    private residenteService: ResidenteService, private formBuilder: FormBuilder) {
    registerLocaleData(localeEs);
  }

  ngOnInit(): void {
    this.getMulta()
    this.getMonto()
    this.getResidente()
    this.verficarMultas();
  }

  public getMulta() {
    this.multaService.getAllMulta().subscribe(
      (multa: any) => {
        this.multas = multa
        console.log(this.multas)
      },
      (error) => console.warn(error)
    );
  }
  // const nada: any"";
  verficarMultas() {
    this.multaService.verMultas().subscribe((data: any) => {
      console.log(data)
    })
  }

  public getMonto() {
    this.montoService.getAllMonto().subscribe(
      (monto: any) => {
        this.montos = monto

      },
      (error) => console.warn(error)
    );
  }

  public getResidente() {
    this.multaService.getAllRes().subscribe(
      (residente: any) => {

        this.residentes = residente

      },
      (error) => console.warn(error)
    );
  }

  public createMulta(form: any) {
    if (this.formMulta.valid) {
      this.multaService.postCreateMulta(form).subscribe((data: any) => {
        if (data.status == "Error") {
          this.showModalMore('center', 'info', data.resp, false, 2000);
        } else {
          this.showModalMore('center', 'success', data.resp, false, 2000);
          this.getMulta();
          this.formMulta.reset();
        }
      })
    } else {
      this.ShowModal('', 'Algún campo se encuentra vació', 'error');

    }

  }
  selectedOptionA: string = ""
  selectedOptionB: string = ""

  ShowModal(title: any, infor: any, tipo: any) {
    Swal.fire(title, infor, tipo);
  }
  showModalMore(position: any, icon: any, title: any, showConfirmButton: any, timer: any) {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: showConfirmButton,
      timer: timer
    });
  }

  getDataAlquiler(mul_id: any) {


  }

  public updateMulta(form: any) {
    this.multaService.putUpdateMulta(form).subscribe((data: any) => {
      if (data.status == "Error") {
        this.showModalMore('center', 'info', data.resp, false, 2000);
      } else {
        this.showModalMore('center', 'success', data.resp, false, 2000);
        this.getMulta();
      }
    })
  }

  public pagoMulta(id_monto:any) {

    Swal.fire({
      title: '¿Está seguro de realizar el pago?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#91C788',
      cancelButtonColor: '#FFAAA7',
      confirmButtonText: 'Sí, deseo pagar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.multaService.pagarMulta(id_monto).subscribe((data: any) => {
          if (data.status == "Error") {
            this.showModalMore('center', 'info', data.resp, false, 2000);
          } else {
            this.showModalMore('center', 'success', data.resp, false, 2000);
            this.getMulta();
          }
        })
      }
    })


    
  }

  public deleteMulta(mul_id: any) {
    // alert(mul_id)
    Swal.fire({
      title: '¿Está seguro de borrar?',
      text: 'No podrá revertir esta acción!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#91C788',
      cancelButtonColor: '#FFAAA7',
      confirmButtonText: 'Sí, deseo eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.multaService.deleteMulta(mul_id).subscribe((data: any) => { this.getMulta(); })
        Swal.fire(
          'Eliminado',
          'La multa ha sido eliminada',
          'success'
        )
      }
    })

  //   this.multaService.deleteMulta(mul_id).subscribe((data: any) => {
  //     if (data.status == "Error") {
  //       this.showModalMore('center', 'info', data.resp, false, 2000);
  //     } else {
  //       this.showModalMore('center', 'success', data.resp, false, 2000);
  //       this.getMulta();
  //     }
  //   })

  }

}
