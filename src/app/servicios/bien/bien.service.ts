import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class BienService {

  url= environment.base_url;
  constructor(private http: HttpClient) { }
  
  public getAllBien(){
    const url=environment.base_url+`bienes`
    return this.http.get(url)
  }

  public postCreateBien(body:any){
    const url=environment.base_url+`bienes`
    return this.http.post(url,body)
  }

  public putUpdateBien(body:any){
    console.log(body)
    const url=environment.base_url+`bienes/`+body.bien_id
    return this.http.put(url,body)
  }
  
  public deleteBien(bien_id:any){
    const url= environment.base_url+`bienes/`+bien_id
    return this.http.delete(url)
  }

}
