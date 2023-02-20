import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CuotaService {

  url: string = 'https://condominio-api.up.railway.app/';
  constructor(private http: HttpClient) { }
  
  public getAllDetallePago(){
    const url=this.url+`detalle_pago`
    return this.http.get(url)
  }

  public getAllResidente(){
    const url=this.url+`Residente`
    return this.http.get(url)
  }

  public postCreateCuota(body:any){
    const url=this.url+`cuota`
    return this.http.post(url,body)
  }

  public putUpdateCuota(body:any){
    console.log(body)
    const url=this.url+`cuota/`+body.ali_id
    return this.http.put(url,body)
  }
  
  public deleteCuota(bien_id:any){
    const url= this.url+`cuota/`+bien_id
    return this.http.delete(url)
  }

}
