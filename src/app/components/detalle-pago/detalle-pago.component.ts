import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelCuota } from 'src/app/modelos/adminitración/pago.module';
import { ModelDetallePago } from 'src/app/modelos/Contabilidad/detallepago';
import { ModelResidenteI } from 'src/app/modelos/modelo.residente';
import { DetallepagoService } from 'src/app/servicios/detallepago/detallepago.service';
import { CuotaService } from 'src/app/servicios/pago/pago.servicie';
import { ResidenteService } from 'src/app/servicios/residente/residente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.css']
})
export class DetallePagoComponent implements OnInit {

  detpagos: ModelDetallePago[]=[];
  residentes: ModelResidenteI[]=[];
  pagos: ModelCuota[]=[];

  formDetallePago = new FormGroup({
    res_id: new FormControl('',Validators.required),
    cuo_id: new FormControl('', Validators.required),
    dcuo_estado: new FormControl('', Validators.required),
    dcuo_fecha: new FormControl('', Validators.required),
  });

  formMultaUpdate = new FormGroup({
    dcuo_id: new FormControl('',Validators.required),
    res_id: new FormControl('',Validators.required),
    cuo_id: new FormControl('', Validators.required),
    dcuo_estado: new FormControl('', Validators.required),
    dcuo_fecha: new FormControl('', Validators.required),
  });

  constructor(private detallePagoService:DetallepagoService, private residenteService:ResidenteService,
    private pagoService:CuotaService, private formBuilder:FormBuilder){}

  ngOnInit(): void {
      this.getDetallePago()
      this.getResidente()
      this.getPago()
  }
  public getDetallePago(){
    this.detallePagoService.getAllDetPago().subscribe(
      (detpago:any)=>{
        this.detpagos=detpago
        console.log(this.detpagos)
      },
      (error)=>console.warn(error)
    );
  }

  public getResidente(){
    this.residenteService.getAllResidente().subscribe(
      (residente:any)=>{
        this.residentes=residente
        console.log(this.residentes)
      },
      (error)=>console.warn(error)
    );
  }

  public getPago(){
    this.pagoService.getAllCuota().subscribe(
      (pago:any)=>{
        this.pagos=pago
        console.log(this.pagos)
      },
      (error)=>console.warn(error)
    );
  }

  public createDetallePago(form: any) {
    if (this.formDetallePago.valid) {
      this.detallePagoService.postCreateDetPago(form).subscribe((data: any) => {
        if (data.status == "Error") {
          this.showModalMore('center', 'info', data.resp, false, 2000);
        } else {
          this.showModalMore('center', 'success', data.resp, false, 2000);
          this.getDetallePago();
          this.formDetallePago.reset();
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

  getDataAlquiler(dcuo_id: any) {


  }

  public updateDetallePago(form:any){
    this.detallePagoService.putUpdateDetPago(form).subscribe((data: any) => {
      if (data.status == "Error") {
        this.showModalMore('center', 'info', data.resp, false, 2000);
      } else {
        this.showModalMore('center', 'success', data.resp, false, 2000);
        this.getDetallePago();
      }
    })
  }

  public deleteDetallePago(dcuo_id:any){
    this.detallePagoService.deleteDetPago(dcuo_id).subscribe((data: any) => {
      if (data.status == "Error") {
        this.showModalMore('center', 'info', data.resp, false, 2000);
      } else {
        this.showModalMore('center', 'success', data.resp, false, 2000);
        this.getDetallePago();
      }
    })

  }
}
