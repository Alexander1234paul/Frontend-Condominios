import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicioService } from 'src/app/servicios/reservaciones/servicios/servicio.service';
import { ModelServicio} from 'src/app/modelos/reservaciones/servicios/servicio.module';
import { ModelTipoServicio} from 'src/app/modelos/reservaciones/servicios/tipoServicio.module';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sub-servicio',
  templateUrl: './sub-servicio.component.html',
  styleUrls: ['./sub-servicio.component.css']
})
export class SubServicioComponent {

  Servicios:ModelServicio[]=[];
  tipoServicio:ModelTipoServicio[]=[]
  public form!: FormGroup;
  selectedOption: string = ""

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
    this.cargarTipoServicio()
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
  public cargarTipoServicio(){
    this.ServicioService.getAllTipoServicio().subscribe(
      (Servicio:any)=>{
        this.tipoServicio=Servicio
        console.log(this.tipoServicio)
      },
      (error)=>console.warn(error)
    )
  }


  public crearServicio(){
    Swal.fire({
      title: '¿Está seguro de querer agregar el servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioService.postCreateServicio({
          ser_fecha:this.form.value.txtfecha,
          ser_descripcion:this.form.value.txtdescripcion,
          ser_total:this.form.value.txttotal,
          tser_id:this.form.value.txttser_id,
        }).subscribe(res=>{
          this.form.reset();
          this.cargarServicio();
          Swal.fire({
            title: '¡Servicio agregado correctamente!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
        },
        err=>{
          Swal.fire({
            title: '¡Error!',
            text: 'Ocurrió un error al agregar el servicio',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }
  

  public eliminarServicio(ser_id:any){
    Swal.fire({
      title: '¿Está seguro de querer eliminar el servicio?',
      text: 'Una vez eliminado, no se podrá recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioService.deleteServicio(ser_id).subscribe(
          res => {
            console.log('El servicio se ha eliminado correctamente');
            Swal.fire(
              'Eliminado!',
              'El servicio se ha eliminado correctamente.',
              'success'
            );
            this.cargarServicio();
          },
          error => {
            console.log('Error al eliminar el servicio', error);
          }
        );
      }
    });
  }


  public actualizarServicio(ser_id:any){
    Swal.fire({
      title: '¿Está seguro de querer actualizar el servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioService.putUpdateServicio({
          ser_id:ser_id,
          ser_fecha:this.form.value.txtfecha,
          ser_descripcion:this.form.value.txtdescripcion,
          ser_total:this.form.value.txttotal,
          tser_id:this.form.value.txttser_id,
        }).subscribe(res=>{
          Swal.fire({
            title: '¡Servicio actualizado correctamente!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          console.log('Datos del servicio actualizados')
          this.cargarServicio();
        },
        err=>{
          Swal.fire({
            title: '¡Error!',
            text: 'Ocurrió un error al actualizar el servicio',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
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

