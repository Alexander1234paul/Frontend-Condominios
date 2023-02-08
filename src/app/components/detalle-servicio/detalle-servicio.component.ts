import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetalleServicioService } from 'src/app/servicios/reservaciones/servicios/detalleServicio.service';
import { ModelDetalleServicio} from 'src/app/modelos/reservaciones/servicios/detalleServicio.module';


@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent {
  detalleServicios:ModelDetalleServicio[]=[];
  public form!: FormGroup;

  public informaciondetalleServicio={
    dser_id:-1,
    dser_evidencia:"",
    ser_id:-1,
    ser_descripcion:""
  }

  constructor(private detalleServicioService:DetalleServicioService,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargardetalleServicio()
    this.form=this.formBuilder.group({
      txtevidencia:[''],
      txtser_id:[''],
    })
    
  }

  public cargardetalleServicio(){
    this.detalleServicioService.getAllDetalleServicio().subscribe(
      (detalleServicio:any)=>{
        this.detalleServicios=detalleServicio
        console.log(this.detalleServicios)
      },
      (error)=>console.warn(error)
    )
  }

  public creardetalleServicio(){
    this.detalleServicioService.postCreateDetalleServicio({
      dser_evidencia:this.form.value.txtevidencia,
      ser_id:this.form.value.txtser_id,
    }).subscribe(res=>{
      console.log('Nuevo Detalle Servicio insertado')
    })
    this.form.reset();
    this.cargardetalleServicio()
  }

  public eliminardetalleServicio(dser_id:any){
    this.detalleServicioService.deleteDetalleServicio(dser_id).subscribe(
      res=>console.log('El Detalle servicio se ha eliminado correctamente'))
      this.cargardetalleServicio(); 
  }

  public actualizardetalleServicio(dser_id:any){
    this.detalleServicioService.putUpdateDetalleServicio({
      dser_id:dser_id,
      dser_evidencia:this.form.value.txtevidencia,
      ser_id:this.form.value.txtser_id,
    }).subscribe(res=>{
      
    })
    console.log('Datos del Detalle servicio actualizados')
      this.cargardetalleServicio()
  }
  public infoUpdatedetalleServicio(dser_id:any,dser_evidencia:any,ser_id:any,ser_descripcion:any){
    this.informaciondetalleServicio.dser_id=dser_id;
    this.informaciondetalleServicio.dser_evidencia=dser_evidencia;
    this.informaciondetalleServicio.ser_id=ser_id;
    this.informaciondetalleServicio.ser_descripcion=ser_descripcion;
  }
}
