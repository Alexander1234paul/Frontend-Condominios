import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DetallepagoService } from 'src/app/servicios/detallepago/detallepago.service';
import { Pago, Alicuota, PagoById } from 'src/app/modelos/pago/pago.module';
import { AlicuotaM } from 'src/app/modelos/pago/alicuota.module';
import { CuotaM } from 'src/app/modelos/pago/cuota.module';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editalicuota',
  templateUrl: './editalicuota.component.html',
  styleUrls: ['./editalicuota.component.css'],
})
export class EditalicuotaComponent implements OnInit {
  alicuotasM: AlicuotaM[] = [];
  public form!: FormGroup;
  cuotasM: CuotaM[] = [];
  pagoById: PagoById[] = [];
  total: number = 0;
  aliId: number | undefined;


  public informacionAlicuota = {
    ali_id: 0,
    ali_descripcion: '',
    ali_costo: 0,
  };


  constructor(
    private detallepagoService: DetallepagoService,
    private formBuilder: FormBuilder,
    private NgxPaginationModule: NgxPaginationModule,
    private FormsModule: FormsModule
  ) {}

  alicuota: Alicuota = {
    ali_descripcion: '',
    ali_costo: 0,
    pagos: [],
  };


  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.cuotasM.length,
  };

  ngOnInit(): void {
    this.recargar();
    this.form = this.formBuilder.group({
      txtDescripcion: [''],
      txtCosto: [''],
    });
  }

  agregarPago() {
    this.alicuota.pagos.push({ pag_descripcion: '', pag_costo: 0 });
  }


  eliminarPago(index: number) {
    this.alicuota.pagos.splice(index, 1);
    this.sumarCostos();
  }

  sumarCostos() {
    this.alicuota.ali_costo = this.alicuota.pagos.reduce(
      (total, pago) => total + pago.pag_costo,
      0
    );
  }
  
  updateTotal() {
    let sum = 0;
    for (let d of this.pagoById) {
      sum += d.pag_costo;
    }
    this.total = sum;
  }

  submitForm() {
    Swal.fire({
      title: '¿Desea agregar la cuota?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallepagoService.postCreateCuota(this.alicuota)
          .subscribe((response) => {
            Swal.fire({
              icon: 'success',
              title: '¡Alicuota agregada!',
              showConfirmButton: false,
              timer: 1500
            });
            console.log('Nueva Cuota insertada');
            this.cargarAlicuota(); 
            this.cargarCuota()// función que recarga la API
          }, (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al agregar alicuota',
              text: error.message
            });
            console.log('Error al insertar nueva Cuota', error);
          });
      }
    });
  }
  
  

  submitForm2() {
    // Display a SweetAlert confirmation dialog
    Swal.fire({
      title: '¿Está seguro de que desea agregar más pagos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar pagos',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, send the request to add the payments
        this.detallepagoService.postPagoById({
          ali_id: this.aliId,
          pagos: this.alicuota.pagos
        }).subscribe(
          (response) => {
            // Display a success notification message
            Swal.fire({
              title: 'Pago agregado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            // Display an error notification message
            Swal.fire({
              title: 'Error al agregar el pago',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    });
  }
  


  public cargarAlicuota() {
    this.detallepagoService.getAllAlicuotas().subscribe(
      (alicuotaM: any) => {
        this.alicuotasM = alicuotaM;
        console.log(this.alicuotasM);
      },
      (error) => console.warn(error)
    );
  }
  public cargarCuota() {
    this.detallepagoService.getAllCuotas().subscribe(
      (CuotaM: any) => {
        this.cuotasM = CuotaM;
        console.log(this.cuotasM);
      },
      (error) => console.warn(error)
    );
    this.alicuota.ali_descripcion = '';
    (this.alicuota.ali_costo = 0), (this.alicuota.pagos = []);
  }
  variable: any;

  public recargar() {
    this.cargarAlicuota();
    this.cargarCuota();
  }

  public infoUpdAlicuota(ali_id: number) {
    this.aliId = ali_id;
    this.detallepagoService.getPagosByID({ali_id: ali_id}).subscribe(
      (pagoById: any) => {
        this.pagoById = pagoById;
        console.log(this.pagoById);
      },
      (error) => console.warn(error)
    );
  }

  public actualizarPago(pag_id: number, pag_descripcion: string, pag_costo: number) {
    Swal.fire({
      title: '¿Está seguro de que desea actualizar este pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallepagoService.putUpdatePago({
          pag_id: pag_id,
          pag_descripcion: pag_descripcion,
          pag_costo: pag_costo,
        }).subscribe(res=>{
          Swal.fire({
            title: 'Pago actualizado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
          });
        }, error => {
          Swal.fire({
            title: 'Error al actualizar el pago',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      }
    });
  }
  

  public actualizarAlicuota(ali_id: number, ali_descripcion: string){
    Swal.fire({
      title: '¿Está seguro de que desea actualizar la descripción de la alicuota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallepagoService.putUpdateAlicuota({
          ali_id: ali_id,
          ali_descripcion: ali_descripcion,
        }).subscribe(res=>{
          Swal.fire({
            title: 'Alicuota actualizada',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          });
        }, error => {
          Swal.fire({
            title: 'Error al actualizar la alicuota',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      }
    });
    this.cargarAlicuota();
    this.cargarCuota();
  }
  

  public deletePago(pag_id: number, ali_id: number) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallepagoService.deletePago({
          pag_id: pag_id,
          ali_id: ali_id
        }).subscribe(res=>{
          Swal.fire({
            title: 'Pago eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
          });
        }, error => {
          Swal.fire({
            title: 'Error al eliminar el pago',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      }
    });
  }
  

  public deleteAlicuota(ali_id: number) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar esta alicuota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallepagoService.deleteAlicuota({ali_id: ali_id}).subscribe(res=>{
          Swal.fire({
            title: 'Alicuota eliminada',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          });
        }, error => {
          Swal.fire({
            title: 'Error al eliminar la alicuota',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      }
    });
    this.cargarAlicuota();
    this.cargarCuota();
  }
}
