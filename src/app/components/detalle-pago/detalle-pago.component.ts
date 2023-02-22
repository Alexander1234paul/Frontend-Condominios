import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelCuota } from 'src/app/modelos/adminitración/pago.module';
import { ModelDetallePago } from 'src/app/modelos/Contabilidad/detallepago';
import { ModelResidenteI } from 'src/app/modelos/modelo.residente';
import { DetallepagoService } from 'src/app/servicios/detallepago/detallepago.service';
import { CuotaService } from 'src/app/servicios/pago/pago.servicie';
import { ResidenteService } from 'src/app/servicios/residente/residente.service';
import { AlicuotaM } from 'src/app/modelos/pago/alicuota.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.css'],
})
export class DetallePagoComponent implements OnInit {
  detpagos: ModelDetallePago[] = [];
  residentes: ModelResidenteI[] = [];
  pagos: ModelCuota[] = [];
  alicuotas: AlicuotaM[] = [];
  selectedOption1: string = '';
  selectedOption2: string = '';

  public form!: FormGroup;

  constructor(
    private detallePagoService: DetallepagoService,
    private residenteService: ResidenteService,
    private pagoService: CuotaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recargar()
    this.form = this.formBuilder.group({
      txtFecha: [''],
      txtResidente: [''],
      txtAlicuota: [''],
      txtTotal: [''],
      txtEstado: [''],
    });
  }
  public getDetallePago() {
    this.detallePagoService.getAllDetPago().subscribe(
      (detpago: any) => {
        this.detpagos = detpago;
        console.log(this.detpagos);
      },
      (error) => console.warn(error)
    );
  }
  public cargarAlicuota() {
    this.detallePagoService.getAllAlicuotas().subscribe(
      (alicuotaM: any) => {
        this.alicuotas = alicuotaM;
        console.log(this.alicuotas);
      },
      (error) => console.warn(error)
    );
  }

  public updateEstado(dpag_id: number, res_correo: string) {
    this.detallePagoService.putUpPagoEstado({
      dpag_id: dpag_id,
      res_correo: res_correo
    }).subscribe(res=>{
      
    })
    console.log('Pagado')
  }

  public getResidente() {
    this.residenteService.getAllResidente().subscribe(
      (residente: any) => {
        this.residentes = residente;
        console.log(this.residentes);
      },
      (error) => console.warn(error)
    );
  }

  public getAllPagos() {
    this.pagoService.getAllDetallePago().subscribe(
      (pago: any) => {
        this.pagos = pago;
        console.log(this.pagos);
      },
      (error) => console.warn(error)
    );
  }

  public crearDetallePago() {
    Swal.fire({
      title: '¿Está seguro de que desea crear los detalles de pago?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallePagoService
          .postCreateDetPago({
            fecha: this.form.value.txtFecha
          })
          .subscribe((res) => {
            console.log('Lista Insertada');
            Swal.fire({
              title: 'Detalles de pago creados',
              text: 'Los detalles de pago se han creado correctamente.',
              icon: 'success'
            });
            this.form.reset();
            this.recargar();
          }, (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error al crear detalles de pago',
              text: 'Ha ocurrido un error al crear los detalles de pago. Por favor, inténtelo de nuevo.',
              icon: 'error'
            });
          });
      }
    });
  }
  
  public recargar() {
    this.getDetallePago();
    this.getAllPagos();
    this.getResidente();
    this.cargarAlicuota();
  }
}