import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelMonto } from 'src/app/modelos/adminitración/monto';
import { ModelMulta } from 'src/app/modelos/Contabilidad/multa';
import { ModelResidenteI } from 'src/app/modelos/modelo.residente';
import { ModelPersona } from 'src/app/modelos/persona/persona.module';
import { MontoService } from 'src/app/servicios/monto/monto.service';
import { MultaService } from 'src/app/servicios/multa/multa.service';
import { ResidenteService } from 'src/app/servicios/residente/residente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multa',
  templateUrl: './multa.component.html',
  styleUrls: ['./multa.component.css']
})
export class MultaComponent implements OnInit{

  multas: ModelMulta[]=[];
  montos: ModelMonto[]=[];
  residentes: ModelResidenteI[]=[];

  formMulta = new FormGroup({
    mon_id: new FormControl('',Validators.required),
    res_id: new FormControl('', Validators.required),
    mul_descripcion: new FormControl('', Validators.required),
    mul_fecha: new FormControl('', Validators.required),
    mul_total: new FormControl('', Validators.required),
    mul_estado: new FormControl('', Validators.required),
  });

  formMultaUpdate = new FormGroup({
    mul_id: new FormControl('',Validators.required),
    mon_id: new FormControl('',Validators.required),
    res_id: new FormControl('', Validators.required),
    mul_descripcion: new FormControl('', Validators.required),
    mul_fecha: new FormControl('', Validators.required),
    mul_total: new FormControl('', Validators.required),
    mul_estado: new FormControl('', Validators.required),
  });

  constructor(private multaService:MultaService, private montoService:MontoService,
    private residenteService:ResidenteService, private formBuilder:FormBuilder){}

  ngOnInit(): void {
      this.getMulta()
      this.getMonto()
      this.getResidente()
  }

  public getMulta(){
    this.multaService.getAllMulta().subscribe(
      (multa:any)=>{
        this.multas=multa
        console.log(this.multas)
      },
      (error)=>console.warn(error)
    );
  }

  public getMonto(){
    this.montoService.getAllMonto().subscribe(
      (monto:any)=>{
        this.montos=monto
        console.log(this.montos)
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

  public updateMulta(form:any){
    this.multaService.putUpdateMulta(form).subscribe((data: any) => {
      if (data.status == "Error") {
        this.showModalMore('center', 'info', data.resp, false, 2000);
      } else {
        this.showModalMore('center', 'success', data.resp, false, 2000);
        this.getMulta();
      }
    })
  }

  public pagoMulta(form:any){
    this.multaService.putpagoMulta(form).subscribe((data: any) => {
      if (data.status == "Error") {
        this.showModalMore('center', 'info', data.resp, false, 2000);
      } else {
        this.showModalMore('center', 'success', data.resp, false, 2000);
        this.getMulta();
      }
    })
  }

  public deleteMulta(mul_id:any){
    this.multaService.deleteMulta(mul_id).subscribe((data: any) => {
      if (data.status == "Error") {
        this.showModalMore('center', 'info', data.resp, false, 2000);
      } else {
        this.showModalMore('center', 'success', data.resp, false, 2000);
        this.getMulta();
      }
    })

  }

}
