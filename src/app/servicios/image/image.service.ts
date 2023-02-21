import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ImgService {

  url= environment.base_url;
  constructor(private http: HttpClient) { }
  
  public getAllImg(){
    const url=this.url+`image`
    return this.http.get(url)
  }


  public postCreateImg(body:FormData){
    const url=this.url+`image`
    return this.http.post(url,body)
  }

  public putUpdateImg(body:any){
    console.log(body)
    const url=this.url+`image/`+body.bien_id
    return this.http.put(url,body)
  }
  
  public deleteImg(bien_id:any){
    const url= this.url+`image/`+bien_id
    return this.http.delete(url)
  }

}
