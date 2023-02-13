import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { ModelVehiculo } from 'src/app/modelos/reservaciones/servicios/vehiculo.module';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent {
  vehiculos:ModelVehiculo[]=[];
  public form!: FormGroup;

  public informacionVehiculos={
    veh_placa:'',
    veh_marca:'',
    veh_modelo:'',
    veh_color:'',
    res_id:0
  }

  constructor(private vehiculoService:VehiculoService,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargarVehiculos()

    this.form=this.formBuilder.group({
      txtplaca:[''],
      txtmarca:[''],
      txtmodelo:[''],
      txtcolor:[''],
      txtres:['']
    })
    
  }
  
  public cargarVehiculos(){
    this.vehiculoService.getAllVehiculo().subscribe(
      (vehiculo:any)=>{
        this.vehiculos=vehiculo
        console.log(this.vehiculos)
      },
      (error)=>console.warn(error)
    )
  }

  public crearVehiculo(){
    this.vehiculoService.postCreateVehiculo({
      veh_placa:this.form.value.txtplaca,
      veh_marca:this.form.value.txtmarca,
      veh_modelo:this.form.value.txtmodelo,
      veh_color:this.form.value.txtcolor,
      res_id:this.form.value.txtres
    }).subscribe(res=>{
      console.log('Nuevo vehículo insertado')
      //Formulario reseteado
      
      //Se cargue los datos despues de enviar
      
    })
    this.form.reset();
    this.cargarVehiculos()
  }

  public eliminarVehiculo(veh_placa:any){
    // console.log(veh_placa)
    this.vehiculoService.deleteVehiculo(veh_placa).subscribe(
      res=>console.log('El vehículo se ha eliminado correctamente'))
      this.cargarVehiculos();
  }

  public actualizarVehiculo(veh_placa:any){
    this.vehiculoService.putUpdateVehiculo({
      veh_placa:veh_placa,
      veh_marca:this.form.value.txtmarca,
      veh_modelo:this.form.value.txtmodelo,
      veh_color:this.form.value.txtcolor,
      res_id:this.form.value.txtres
    }).subscribe(res=>{
      
    })
    console.log('Datos del vehículo actualizados')
      this.cargarVehiculos()
  }

  public infoUpdateVehiculo(veh_placa:any,veh_marca:any,veh_modelo:any,veh_color:any,res_id:any){
    this.informacionVehiculos.veh_placa=veh_placa;
    this.informacionVehiculos.veh_marca=veh_marca;
    this.informacionVehiculos.veh_modelo=veh_modelo;
    this.informacionVehiculos.veh_color=veh_color;
    this.informacionVehiculos.res_id=res_id;
  }
}
