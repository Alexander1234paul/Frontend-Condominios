import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BienService } from 'src/app/servicios/bien/bien.service';
import { ModelBien } from 'src/app/modelos/bien/bien.module';
import Swal from 'sweetalert2';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.css']
})
export class BienComponent implements OnInit {

  bienes: ModelBien[] = [];
  public form!: FormGroup;

  bien_id: any

  idUpdatedBien: any

  public informacionBienes = {
    bien_id: -1,
    bien_descripcion: "",
    bien_costo: 0,
  }

  constructor(private bienService: BienService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cargarBienes();

    this.form = this.formBuilder.group({
      bien_descripcion: [''],
      bien_costo: ['']
    })

  }

  public cargarBienes() {
    this.bienService.getAllBien().subscribe(
      (bien: any) => {
        this.bienes = bien
        console.log(this.bienes)
      },
      (error) => console.warn(error)
    )
  }

  public crearBien() {
    this.bienService.postCreateBien({
      bien_descripcion: this.form.value.bien_descripcion,
      bien_costo: this.form.value.bien_costo
    }).subscribe(res => {
      console.log('Nuevo Bien insertado')
      this.form.reset()
      this.cargarBienes()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El bien se insertó correctamente',
        showConfirmButton: false,
        timer: 1500
      })

    })

  }

  public eliminarBien(bien_id: any) {
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
        this.bienService.deleteBien(bien_id).
        subscribe(res => console.log('El bien se ha eliminado correctamente'))
        this.cargarBienes();
        Swal.fire(
          'Eliminado',
          'El bien ha sido eliminado',
          'success'
        )
      }
    })
  }

  public actualizarBien() {

    this.bienService.putUpdateBien({
      bien_id: this.idUpdatedBien,
      bien_descripcion: this.form.value.bien_descripcion,
      bien_costo: this.form.value.bien_costo
    }).subscribe(res => {
      console.log('Datos del bien actualizados')
      this.form.reset()
      this.cargarBienes()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bien actualizado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public infoUpdateBien(bien: any) {
    this.informacionBienes.bien_id = this.idUpdatedBien = bien.bien_id
    this.form.controls["bien_descripcion"].setValue(bien.bien_descripcion)
    this.form.controls["bien_costo"].setValue(bien.bien_costo)

  }



}
