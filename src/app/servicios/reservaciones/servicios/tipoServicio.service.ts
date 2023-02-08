import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TipoServicioService {

  url: string = 'https://condominio-api.up.railway.app/';
  constructor(private http: HttpClient) { }
  
  public getAllTipoServicio(){
    const url=this.url+`tipo_servicios`
    return this.http.get(url)
  }

  public postCreateTipoServicio(body:any){
    const url=this.url+`tipo_servicio`
    return this.http.post(url,body)
  }

  public putUpdateTipoServicio(body:any){
    console.log(body)
    const url=this.url+`tipo_servicio/`+body.tser_id
    return this.http.put(url,body)
  }
  
  public deleteTipoServicio(tser_id:any){
    const url= this.url+`tipo_servicio/`+tser_id
    return this.http.delete(url)
  }

}
