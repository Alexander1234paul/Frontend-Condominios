import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicioService } from 'src/app/servicios/reservaciones/servicios/servicio.service';
import { ModelServicio} from 'src/app/modelos/reservaciones/servicios/servicio.module';


@Component({
  selector: 'app-sub-servicio',
  templateUrl: './sub-servicio.component.html',
  styleUrls: ['./sub-servicio.component.css']
})
export class SubServicioComponent {

  Servicios:ModelServicio[]=[];
  public form!: FormGroup;

  public informacionServicio={
    ser_id:-1,
    ser_fecha:"",
    ser_descripcion:"",
    ser_total:"",
    tser_descripcion:"",
    tser_id:-1,
  }

  constructor(private ServicioService:ServicioService,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargarServicio()
    this.form=this.formBuilder.group({
      txtfecha:[''],
      txtdescripcion:[''],
      txttotal:[''],
      txttser_id:['']
    })
    
  }

  public cargarServicio(){
    this.ServicioService.getAllServicio().subscribe(
      (Servicio:any)=>{
        this.Servicios=Servicio
        console.log(this.Servicios)
      },
      (error)=>console.warn(error)
    )
  }

  public crearServicio(){
    this.ServicioService.postCreateServicio({
      ser_fecha:this.form.value.txtfecha,
      ser_descripcion:this.form.value.txtdescripcion,
      ser_total:this.form.value.txttotal,
      tser_id:this.form.value.txttser_id,
    }).subscribe(res=>{
      console.log('Nuevo Tipo Servicio insertado')
    })
    this.form.reset();
    this.cargarServicio()
  }

  public eliminarServicio(ser_id:any){
    this.ServicioService.deleteServicio(ser_id).subscribe(
      res=>console.log('El servicio se ha eliminado correctamente'))
      this.cargarServicio();
  }

  public actualizarServicio(ser_id:any){
    this.ServicioService.putUpdateServicio({
      ser_id:ser_id,
      ser_fecha:this.form.value.txtfecha,
      ser_descripcion:this.form.value.txtdescripcion,
      ser_total:this.form.value.txttotal,
      tser_id:this.form.value.txttser_id,
    }).subscribe(res=>{
      
    })
    console.log('Datos del tipo servicio actualizados')
      this.cargarServicio()
  }
  public infoUpdateServicio(ser_id:any,ser_fecha:any,ser_descripcion:any, ser_total:any,tser_id:any,tser_descripcion:any){
    this.informacionServicio.ser_id=ser_id;
    this.informacionServicio.ser_fecha=ser_fecha;
    this.informacionServicio.ser_descripcion=ser_descripcion;
    this.informacionServicio.ser_total=ser_total;
    this.informacionServicio.tser_id=tser_id;
    this.informacionServicio.tser_descripcion=tser_descripcion;
  }
}

