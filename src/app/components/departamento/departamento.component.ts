import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartamentoService } from 'src/app/servicios/departamento/departamento.service';
import { ModelDepartamento } from 'src/app/modelos/departamento/departamento.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos:ModelDepartamento[]=[];
  public form!: FormGroup;

  public informacionDepartamentos={
    dep_id:"",
    dep_telefono:"",
    dep_estado:false,
    dep_ocupacion:false
  }

  constructor(private departamentoService:DepartamentoService,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargarDepartamentos()

    this.form=this.formBuilder.group({
      txtdep_id:[''],
      txtdep_telefono:[''],
      txtdep_estado:[''],
      txtdep_ocupacion:['']
    })
  }

  public cargarDepartamentos(){
    this.departamentoService.getAllDepartamento().subscribe(
      (departamento:any)=>{
        this.departamentos=departamento
        console.log(this.departamentos)
      },
      (error)=>console.warn(error)
    )
  }

  public crearDepartamento(){

    let estado=true;
    let ocupacion=true;
    if (this.form.value.txtdep_estado==null) {
      estado=false;
    }else if(this.form.value.txtdep_ocupacion==null){
      ocupacion=false;
    }

    this.departamentoService.postCreateDepartamento({
      dep_id:this.form.value.txtdep_id,
      dep_telefono:this.form.value.txtdep_telefono,
      dep_estado: estado,
      dep_ocupacion:ocupacion
    }).subscribe(res=>{
      console.log('Nuevo Departamento insertado')
    })
    //this.form.reset();
    this.cargarDepartamentos()
  }

  public eliminarDepartamento(dep_id: any) {
    Swal.fire({
      title: '¿Está seguro de borrar?',
      text: 'No podrá revertir esta acción!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#91C788',
      cancelButtonColor: '#FFAAA7',
      confirmButtonText: 'Sí, deseo eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departamentoService.deleteDepartamento(dep_id).subscribe(res=>console.log('El departamento se ha eliminado correctamente'))
        this.cargarDepartamentos();
        Swal.fire(
          'Eliminado',
          'El departamento ha sido eliminado',
          'success'
        )
      }
    })
  }

  public actualizarDepartamento(dep_id:any){

    let estado=true;
    let ocupacion=true;
    if (this.form.value.txtdep_estado==null) {
      estado=false;
    }else if(this.form.value.txtdep_ocupacion==null){
      ocupacion=false;
    }

    this.departamentoService.putUpdateDepartamento({
      dep_id:dep_id,
      dep_telefono:this.form.value.txtdep_telefono,
      dep_estado:estado,
      dep_ocupacion:ocupacion
    }).subscribe(res=>{
      this.cargarDepartamentos()
      console.log('Datos del departamento actualizados')
    })
    Swal.fire({
      position:'center',
      icon:'success',
      title:'Departamento actualizado exitosamente',
      showConfirmButton:false,
      timer:1500
    })
    //this.form.reset();
    
  }

  public infoUpdateDepartamento(dep_id:any,dep_telefono:any,dep_estado:any,dep_ocupacion:any){
    this.informacionDepartamentos.dep_id=dep_id;
    this.informacionDepartamentos.dep_telefono=dep_telefono;
    this.informacionDepartamentos.dep_estado=dep_estado;
    this.informacionDepartamentos.dep_ocupacion=dep_ocupacion;
  }

}
