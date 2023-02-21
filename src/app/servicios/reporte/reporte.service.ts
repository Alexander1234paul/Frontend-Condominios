import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class reporteService {

  url= environment.base_url;
  constructor(private http: HttpClient) { }
  
  public getAllreporte(){
    const url=this.url+`reportes`
    return this.http.get(url)
  }

  public postCreatereporte(body:any){
    const url=this.url+`reporte`
    return this.http.post(url,body)
  }

  public putUpdatereporte(body:any){
    console.log(body)
    const url=this.url+`reporte/`+body.ind_id
    return this.http.put(url,body)
  }
  
  public deletereporte(ind_id:any){
    const url= this.url+`reporte/`+ind_id
    return this.http.delete(url)
  }

  public getCuotas(ind_id:any){
    const url= this.url+`reportecuota/`+ind_id
    return this.http.delete(url)
  }
  public getAlquileres(ind_id:any){
    const url= this.url+`reportealquiler/`+ind_id
    return this.http.get(url)
  }
  
  public getMultas(ind_id:any){
    const url= this.url+`reportemulta/`+ind_id
    return this.http.get(url)
  }

  public getGastos(ind_id:any){
    const url= this.url+`reportegasto/`+ind_id
    return this.http.get(url)
  }

}
