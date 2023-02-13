import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CuotaService {

  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  
  public getAllCuota(){
    const url=this.url+`cuotas`
    return this.http.get(url)
  }

  public postCreateCuota(body:any){
    const url=this.url+`cuota`
    return this.http.post(url,body)
  }

  public putUpdateCuota(body:any){
    console.log(body)
    const url=this.url+`cuota/`+body.bien_id
    return this.http.put(url,body)
  }
  
  public deleteCuota(bien_id:any){
    const url= this.url+`cuota/`+bien_id
    return this.http.delete(url)
  }

}
