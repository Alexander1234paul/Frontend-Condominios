import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class DetalleServicioService {

  url= environment.base_url;
  constructor(private http: HttpClient) { }
  
  public getAllDetalleServicio(){
    const url=this.url+`detalle_servicios`
    return this.http.get(url)
  }

  public getAllServicio(){
    const url=this.url+`servicios`
    return this.http.get(url)
  }

  public postCreateDetalleServicio(body:any){
    const url=this.url+`detalle_servicio`
    return this.http.post(url,body)
  }

  public putUpdateDetalleServicio(body:any){
    console.log(body)
    const url=this.url+`detalle_servicio/`+body.dser_id
    return this.http.put(url,body)
  }
  
  public deleteDetalleServicio(dser_id:any){
    const url= this.url+`detalle_servicio/`+dser_id
    return this.http.delete(url)
  }

}
