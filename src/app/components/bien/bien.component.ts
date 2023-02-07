import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BienService } from 'src/app/servicios/bien/bien.service';
import { ModelBien } from 'src/app/modelos/bien/bien.module';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.css']
})
export class BienComponent implements OnInit{
  
  bienes:ModelBien[]=[];
  public form!: FormGroup;

  public informacionBienes={
    bien_id:-1,
    bien_descripcion:"",
    bien_costo:0
  }

  constructor(private bienService:BienService,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargarBienes()

    this.form=this.formBuilder.group({
      txtdescripcion:[''],
      txtcosto:['']
    })
    
  }

  public cargarBienes(){
    this.bienService.getAllBien().subscribe(
      (bien:any)=>{
        this.bienes=bien
        console.log(this.bienes)
      },
      (error)=>console.warn(error)
    )
  }

    // public cargarProductos() {
    //   this.productoService.getProductos().subscribe(
    //     (producto: any) => {
    //       this.productos = producto
    //       console.log(this.productos)
    //     }, (error) => console.warn(error)
    //   )
    // }

  public crearBien(){
    this.bienService.postCreateBien({
      bien_descripcion:this.form.value.txtdescripcion,
      bien_costo:this.form.value.txtcosto
    }).subscribe(res=>{
      console.log('Nuevo Bien insertado')
      //Formulario reseteado
      
      //Se cargue los datos despues de enviar
      
    })
    this.form.reset();
    this.cargarBienes()
  }

  public eliminarBien(bien_id:any){
    // console.log(bien_id)
    this.bienService.deleteBien(bien_id).subscribe(
      res=>console.log('El bien se ha eliminado correctamente'))
      this.cargarBienes();
  }

  public actualizarBien(bien_id:any){
    this.bienService.putUpdateBien({
      bien_id:bien_id,
      bien_descripcion:this.form.value.txtdescripcion,
      bien_costo:this.form.value.txtcosto
    }).subscribe(res=>{
      
    })
    console.log('Datos del bien actualizados')
      this.cargarBienes()
  }

  public infoUpdateBien(bien_id:any,bien_descripcion:any,bien_costo:any){
    this.informacionBienes.bien_id=bien_id;
    this.informacionBienes.bien_descripcion=bien_descripcion;
    this.informacionBienes.bien_costo=bien_costo;
  }

}
