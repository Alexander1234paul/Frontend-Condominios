import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MontoService } from 'src/app/servicios/monto/monto.service';
import { ModelMonto } from 'src/app/modelos/adminitración/monto';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'

@Component({
  selector: 'app-monto',
  templateUrl: './monto.component.html',
  styleUrls: ['./monto.component.css']
})
export class MontoComponent implements OnInit{

  montos: ModelMonto[]=[];
  public form!: FormGroup;

  mon_id: any
  idUpdateMonto: any

  public informacionMonto={
    mon_id:-1,
    mon_precio:"",
    mon_fecha:""
  }

  public infoUpdateMonto(monto:any){
    this.informacionMonto.mon_id=this.idUpdateMonto = monto.mon_id
    this.form.controls["mon_precio"].setValue(monto.mon_precio)
    this.form.controls["mon_fecha"].setValue(monto.mon_fecha)
  }

  constructor(private montoService:MontoService, private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargarMonto();
    registerLocaleData(localeEs);

    this.form = this.formBuilder.group({
      mon_precio: [''],
      mon_fecha: ['']
    })

  }

  public cargarMonto() {
    this.montoService.getAllMonto().subscribe(
      (monto: any) => {
        this.montos = monto
        console.log(this.montos)
      },
      (error) => console.warn(error)
    )
  }

  public createMonto() {
    this.montoService.postCreateMonto({
      mon_precio:this.form.value.mon_precio,
      mon_fecha:this.form.value.mon_fecha
    }).subscribe(res=>{
      console.log('Nuevo Monto insertado')
      this.form.reset();
      this.cargarMonto()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El monto se insertó correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public updateMonto(){
    this.montoService.putUpdateMonto({
      mon_id: this.idUpdateMonto,
      mon_precio:this.form.value.mon_precio,
      mon_fecha:this.form.value.mon_fecha
    }).subscribe(res=>{
      console.log('Datos del Monto actualizado')
      this.form.reset()
      this.cargarMonto()
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Monto actualizado exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

  public deleteMonto(mon_id:any){
    Swal.fire({
      title: '¿Está seguro que desea elimnar?',
      text: 'No podrá revertir esta acción!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#91C788',
      cancelButtonColor: '#FFAAA7',
      confirmButtonText: 'Sí, deseo eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.montoService.deleteMonto(mon_id).subscribe(res => console.log('El monto se ha eliminado correctamente'))
        this.cargarMonto();
        Swal.fire(
          'Eliminado',
          'El monto ha sido eliminado',
          'success'
        )
      }
    })
  }

}
