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
  departamentos: ModelDepartamento[] = [];
  public form!: FormGroup;

  dep_id2: any
  idUpdatedDepartamento: any

  public informacionDepartamentos = {
    dep_id: "",
    dep_telefono: "",
    dep_estado: false,
    dep_ocupacion: false
  }

  constructor(private departamentoService: DepartamentoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cargarDepartamentos()

    this.form = this.formBuilder.group({
      dep_id: [''],
      dep_telefono: [''],
      dep_estado: [false],
      dep_ocupacion: [false]
    })
  }

  public cargarDepartamentos() {
    this.departamentoService.getAllDepartamento().subscribe(
      (departamento: any) => {
        this.departamentos = departamento
        console.log(this.departamentos)
      },
      (error) => console.warn(error)
    )
  }

  public crearDepartamento() {
    this.departamentoService.postCreateDepartamento({
      dep_id: this.form.value.dep_id,
      dep_telefono: this.form.value.dep_telefono,
      dep_estado: this.form.value.dep_estado,
      dep_ocupacion: this.form.value.dep_ocupacion
    }).subscribe((res: any) => {
      console.log('Nuevo departamento insertado')
      this.form.reset()
      this.cargarDepartamentos()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El departamento se insertó correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })

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
        this.departamentoService.deleteDepartamento(dep_id).subscribe(res => console.log('El departamento se ha eliminado correctamente'))
        this.cargarDepartamentos();
        Swal.fire(
          'Eliminado',
          'El departamento ha sido eliminado',
          'success'
        )
      }
    })
  }

  public actualizarDepartamento() {
    this.departamentoService.putUpdateDepartamento({
      dep_id: this.idUpdatedDepartamento,
      dep_telefono: this.form.value.dep_telefono,
      dep_estado: this.form.value.dep_estado,
      dep_ocupacion: this.form.value.dep_ocupacion
    }).subscribe(res => {
      console.log('Datos del departamento actualizados')
      this.form.reset()
      this.cargarDepartamentos()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Departamento actualizado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
    
  }

  cambiarEstado(valor: any): String {
    let resp = ""
    if (valor == true) {
      resp = "Correcto"
    } else {
      resp = "Mantenimiento"
    }
    return resp
  }

  cambiarOcupacion(valor: any): String {
    let resp = ""
    if (valor == true) {
      resp = "En uso"
    } else {
      resp = "Disponible"
    }
    return resp
  }

  public infoUpdateDepartamento(departamento: any) {
    this.informacionDepartamentos.dep_id = this.idUpdatedDepartamento = departamento.dep_id
    this.form.controls["dep_telefono"].setValue(departamento.dep_telefono)
    this.form.controls["dep_estado"].setValue(departamento.dep_estado)
    this.form.controls["dep_ocupacion"].setValue(departamento.dep_ocupacion)
  }

}
