import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BienService {

  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  
  public getAllBien(){
    const url=this.url+`bienes`
    return this.http.get(url)
  }

  public postCreateBien(body:any){
    const url=this.url+`bienes`
    return this.http.post(url,body)
  }

  public putUpdateBien(body:any){
    console.log(body)
    const url=this.url+`bienes/`+body.bien_id
    return this.http.put(url,body)
  }
  
  public deleteBien(bien_id:any){
    const url= this.url+`bienes/`+bien_id
    return this.http.delete(url)
  }

}
