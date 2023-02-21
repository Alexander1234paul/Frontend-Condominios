import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServicioService {

  url= environment.base_url;
  constructor(private http: HttpClient) { }
  
  public getAllServicio(){
    const url=this.url+`servicios`
    return this.http.get(url)
  }
  public getAllTipoServicio(){
    const url=this.url+`tipo_servicios`
    return this.http.get(url)
  }

  public postCreateServicio(body:any){
    const url=this.url+`servicio`
    return this.http.post(url,body)
  }

  public putUpdateServicio(body:any){
    console.log(body)
    const url=this.url+`servicio/`+body.ser_id
    return this.http.put(url,body)
  }
  
  public deleteServicio(ser_id:any){
    const url= this.url+`servicio/`+ser_id
    return this.http.delete(url)
  }

}
