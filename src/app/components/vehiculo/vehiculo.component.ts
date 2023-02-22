import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { ModelVehiculo } from 'src/app/modelos/reservaciones/servicios/vehiculo.module';
import { ModelResidenteI } from 'src/app/modelos/modelo.residente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent {
  vehiculos:ModelVehiculo[]=[];
  residentes: ModelResidenteI[] = [];
  public form!: FormGroup;

  public informacionVehiculos={
    veh_placa:'',
    veh_marca:'',
    veh_modelo:'',
    veh_color:'',
    res_id:-1,
    resi:''
  }

  selectedOption: string = ""
  per_nombres: String = "";

  constructor(private vehiculoService:VehiculoService,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cargarVehiculos(),
    this.showAllResidentes()

    this.form=this.formBuilder.group({
      txtplaca:[''],
      txtmarca:[''],
      txtmodelo:[''],
      txtcolor:[''],
      txtresidente:['']
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

  showAllResidentes() {
    this.vehiculoService.getAllResidente().subscribe(
      (residentes: any) => {
        this.residentes = residentes
        console.log(residentes)
      },
      (error) => console.log(error)
    );
  }

  public crearVehiculo(){
    this.vehiculoService.postCreateVehiculo({
      veh_placa:this.form.value.txtplaca,
      veh_marca:this.form.value.txtmarca,
      veh_modelo:this.form.value.txtmodelo,
      veh_color:this.form.value.txtcolor,
      res_id:this.form.value.txtresidente
    }).subscribe(res=>{
      console.log('Nuevo vehículo insertado')
      this.form.reset();
    this.cargarVehiculos()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El vehículo se insertó correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      
    })
    
  }

  public eliminarVehiculo(veh_placa:any){
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
    this.vehiculoService.deleteVehiculo(veh_placa).subscribe(
      res=>console.log('El vehículo se ha eliminado correctamente'))
      this.cargarVehiculos();
      Swal.fire(
        'Eliminado',
        'El vehículo ha sido eliminado',
        'success'
      )
    }
  })
}

  public actualizarVehiculo(veh_placa:any){
    this.vehiculoService.putUpdateVehiculo({
      veh_placa:veh_placa,
      veh_marca:this.form.value.txtmarca,
      veh_modelo:this.form.value.txtmodelo,
      veh_color:this.form.value.txtcolor,
      res_id:this.form.value.txtres
    }).subscribe(res=>{
      console.log('Datos del vehículo actualizados')
      this.cargarVehiculos()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Vehículo actualizado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
    
  }

  public infoUpdateVehiculo(veh_placa:any,veh_marca:any,veh_modelo:any,veh_color:any,res_id:any){
    this.informacionVehiculos.veh_placa=veh_placa;
    this.informacionVehiculos.veh_marca=veh_marca;
    this.informacionVehiculos.veh_modelo=veh_modelo;
    this.informacionVehiculos.veh_color=veh_color;
    this.informacionVehiculos.res_id=res_id;
  }

}
