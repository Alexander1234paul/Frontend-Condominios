import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DetallepagoService } from 'src/app/servicios/detallepago/detallepago.service';
import { Pago, Alicuota, PagoById } from 'src/app/modelos/pago/pago.module';
import { AlicuotaM } from 'src/app/modelos/pago/alicuota.module';
import { CuotaM } from 'src/app/modelos/pago/cuota.module';
import { NgxPaginationModule } from 'ngx-pagination';

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
    this.detallepagoService
      .postCreateCuota(this.alicuota)
      .subscribe((response) => {
        console.log('Nueva Cuota insertada');
      });
  }

  submitForm2() {
    console.log(this.alicuota.pagos);
    this.detallepagoService
    .postPagoById({
      ali_id: this.aliId,
      pagos: this.alicuota.pagos
    }).subscribe((response) => {
      console.log('Nueva Cuota insertada');
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
    this.detallepagoService.putUpdatePago({
      pag_id: pag_id,
      pag_descripcion: pag_descripcion,
      pag_costo: pag_costo,
    }).subscribe(res=>{
      
    })
    console.log('Datos actualizados')
  }
  public actualizarAlicuota(ali_id: number, ali_descripcion: string){
    this.detallepagoService.putUpdateAlicuota({
      ali_id: ali_id,
      ali_descripcion: ali_descripcion,
    }).subscribe(res=>{
      
    })
    console.log('Alicuota actualizados')
  }

  public deletePago(pag_id: number, ali_id: number) {
    this.detallepagoService.deletePago({
      pag_id: pag_id,
      ali_id: ali_id
    }).subscribe(res=>{
      
    })
    console.log('Datos Eliminados')
  }

  public deleteAlicuota(ali_id: number) {
    this.detallepagoService.deleteAlicuota({ali_id: ali_id}).subscribe(res=>{
      
    })
    console.log('Datos Eliminados')
  }
}
