import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoServicioService } from 'src/app/servicios/reservaciones/servicios/tipoServicio.service';
import { ModelTipoServicio} from 'src/app/modelos/reservaciones/servicios/tipoServicio.module';
import Swal from 'sweetalert2';

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

  public crearTipoServicio() {
    Swal.fire({
      title: '¿Está seguro de querer agregar la contratación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoServicioService.postCreateTipoServicio({
          tser_descripcion: this.form.value.txtdescripcion,
        }).subscribe(res => {
          Swal.fire(
            'Agregado!',
            'El tipo de contratación ha sido agregado.',
            'success'
          );
          this.form.reset();
          this.cargarTipoServicio();
        },
        err => {
          Swal.fire(
            'Error!',
            'Ocurrió un error al agregar el tipo de contratación.',
            'error'
          );
        });
      }
    });
  }  

  public eliminarTipoServicio(tser_id:any) {
    Swal.fire({
      title: '¿Está seguro de querer eliminar el tipo de contratación?',
      text: 'Una vez eliminado, no se podrá recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoServicioService.deleteTipoServicio(tser_id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El tipo de contratación ha sido eliminado.',
              'success'
            );
            this.cargarTipoServicio();
          },
          err => {
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar el tipo de contratación.',
              'error'
            );
          }
        );
      }
    });
  }
  

  public actualizarTipoServicio(tser_id:any) {
    Swal.fire({
      title: '¿Está seguro de querer editar el tipo de contratación?',
      text: 'Una vez editado, no se podrá recuperar la versión anterior',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoServicioService.putUpdateTipoServicio({
          tser_id:tser_id,
          tser_descripcion:this.form.value.txtdescripcion,
        }).subscribe(res=>{
          Swal.fire({
            title: 'Tipo de contratación actualizado',
            icon: 'success',
          });
          this.cargarTipoServicio();
        });
      }
    });
  }
  public infoUpdateTipoServicio(tser_id:any,tser_descripcion:any){
    this.informacionTipoServicio.tser_id=tser_id;
    this.informacionTipoServicio.tser_descripcion=tser_descripcion;
  }
}
