import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CuotaService } from 'src/app/servicios/pago/pago.servicie';
import { ModelCuota } from 'src/app/modelos/adminitración/pago.module';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  cuotas:ModelCuota[]=[];
  public form!: FormGroup;

  public informacionCuotas={
    cuo_id:-1,
    cuo_descripcion:"",
    cuo_costo:0
  }

  constructor(private cuotaService:CuotaService,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargarCuotas()

    this.form=this.formBuilder.group({
      txtid:[''],
      txtdescripcion:[''],
      txtcosto:['']
    })
    
  }
  
  public cargarCuotas(){
    this.cuotaService.getAllCuota().subscribe(
      (cuota:any)=>{
        this.cuotas=cuota
        console.log(this.cuotas)
      },
      (error)=>console.warn(error)
    )
  }

  public crearCuota(){
    this.cuotaService.postCreateCuota({
      cuo_id:this.form.value.txtid,
      cuo_descripcion:this.form.value.txtdescripcion,
      cuo_costo:this.form.value.txtcosto
    }).subscribe(res=>{
      console.log('Nuevo pago insertado')
      //Formulario reseteado
      
      //Se cargue los datos despues de enviar
      
    })
    this.form.reset();
    this.cargarCuotas()
  }

  public eliminarCuota(cuo_id:any){
    // console.log(cuo_id)
    this.cuotaService.deleteCuota(cuo_id).subscribe(
      res=>console.log('El pago se ha eliminado correctamente'))
      this.cargarCuotas();
  }

  public actualizarCuota(cuo_id:any){
    this.cuotaService.putUpdateCuota({
      cuo_id:cuo_id,
      cuo_descripcion:this.form.value.txtdescripcion,
      cuo_costo:this.form.value.txtcosto
    }).subscribe(res=>{
      
    })
    console.log('Datos del pago actualizados')
      this.cargarCuotas()
  }

  public infoUpdateCuota(cuo_id:any,cuo_descripcion:any,cuo_costo:any){
    this.informacionCuotas.cuo_id=cuo_id;
    this.informacionCuotas.cuo_descripcion=cuo_descripcion;
    this.informacionCuotas.cuo_costo=cuo_costo;
  }
}
