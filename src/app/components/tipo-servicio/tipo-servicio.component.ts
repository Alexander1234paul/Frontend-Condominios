import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoServicioService } from 'src/app/servicios/reservaciones/servicios/tipoServicio.service';
import { ModelTipoServicio} from 'src/app/modelos/reservaciones/servicios/tipoServicio.module';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.css']
})
export class TipoServicioComponent {

  tipoServicios:ModelTipoServicio[]=[];
  public form!: FormGroup;

  public informacionTipoServicio={
    tser_id:-1,
    tser_descripcion:""
  }

  constructor(private tipoServicioService:TipoServicioService,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargarTipoServicio()
    this.form=this.formBuilder.group({
      txtdescripcion:[''],
    })
    
  }

  public cargarTipoServicio(){
    this.tipoServicioService.getAllTipoServicio().subscribe(
      (tipoServicio:any)=>{
        this.tipoServicios=tipoServicio
        console.log(this.tipoServicios)
      },
      (error)=>console.warn(error)
    )
  }

  public crearTipoServicio(){
    this.tipoServicioService.postCreateTipoServicio({
      tser_descripcion:this.form.value.txtdescripcion,
    }).subscribe(res=>{
      console.log('Nuevo Tipo Servicio insertado')
    })
    this.form.reset();
    this.cargarTipoServicio()
  }

  public eliminarTipoServicio(tser_id:any){
    this.tipoServicioService.deleteTipoServicio(tser_id).subscribe(
      res=>console.log('El tipo servicio se ha eliminado correctamente'))
      this.cargarTipoServicio();
  }

  public actualizarTipoServicio(tser_id:any){
    this.tipoServicioService.putUpdateTipoServicio({
      tser_id:tser_id,
      tser_descripcion:this.form.value.txtdescripcion,
    }).subscribe(res=>{
      
    })
    console.log('Datos del tipo servicio actualizados')
      this.cargarTipoServicio()
  }
  public infoUpdateTipoServicio(tser_id:any,tser_descripcion:any){
    this.informacionTipoServicio.tser_id=tser_id;
    this.informacionTipoServicio.tser_descripcion=tser_descripcion;
  }
}
