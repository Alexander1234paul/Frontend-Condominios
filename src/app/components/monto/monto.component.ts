import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MontoService } from 'src/app/servicios/monto/monto.service';
import { ModelMonto } from 'src/app/modelos/adminitración/monto';

@Component({
  selector: 'app-monto',
  templateUrl: './monto.component.html',
  styleUrls: ['./monto.component.css']
})
export class MontoComponent{

  montos: ModelMonto[]=[];
  public form!: FormGroup;

  public informacionMonto={
    mon_id:-1,
    mon_precio:0
  }

  public infoUpdateMonto(mon_id:any, mon_precio:any){
    this.informacionMonto.mon_id=mon_id;
    this.informacionMonto.mon_precio=mon_precio;
  }

  constructor(private montoService:MontoService, private formBuilder:FormBuilder){}

  ngOnInit(): void {
      this.getmonto()

      this.form=this.formBuilder.group({
        txtprecio:['']
      })
  }

  public getmonto(){
    this.montoService.getAllMonto().subscribe(
      (monto:any)=>{
        this.montos=monto
        console.log(this.montos)
      },
      (error)=>console.warn(error)
    );
  }

  public createMonto(form: any) {
    this.montoService.postCreateMonto({
      mon_precio:this.form.value.txtprecio
    }).subscribe(res=>{
      console.log('Nuevo Monto insertado')
    })
    this.form.reset();
    this.getmonto()
  }

  public updateMonto(mon_id:any){
    this.montoService.putUpdateMonto({
      mon_id:mon_id,
      mon_precio:this.form.value.txtprecio
    }).subscribe(res=>{
      console.log('Datos del Monto actualizado')
    })
    this.getmonto();
  }

  public deleteMonto(mon_id:any){
    this.montoService.deleteMonto(mon_id).subscribe(
      res=>console.log('El monto se ha eliminado correctamente'))
      this.getmonto();
  }

}
