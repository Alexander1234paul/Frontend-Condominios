import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {

  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  
  public getAllVehiculo(){
    const url=this.url+`vehiculos`
    return this.http.get(url)
  }

  public postCreateVehiculo(body:any){
    const url=this.url+`vehiculo`
    return this.http.post(url,body)
  }

  public putUpdateVehiculo(body:any){
    console.log(body)
    const url=this.url+`vehiculo/`+body.veh_placa
    return this.http.put(url,body)
  }
  
  public deleteVehiculo(veh_placa:any){
    const url= this.url+`vehiculo/`+veh_placa
    return this.http.delete(url)
  }

}
