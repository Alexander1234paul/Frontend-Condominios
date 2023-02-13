import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  url: string = 'https://condominio-api.up.railway.app/';
  constructor(private http: HttpClient) { }
  
  public getAllDepartamento(){
    const url=environment.base_url+`departamentos`
    return this.http.get(url)
  }

  public postCreateDepartamento(body:any){
    const url=environment.base_url+`departamentos`
    return this.http.post(url,body)
  }

  public putUpdateDepartamento(body:any){
    console.log(body)
    const url=environment.base_url+`departamentos/`+body.dep_id
    return this.http.put(url,body)
  }
  
  public deleteDepartamento(dep_id:any){
    const url= environment.base_url+`departamentos/`+dep_id
    return this.http.delete(url)
  }
}
