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

  public putUpdateImg(id:any,body:FormData){
    console.log(body)
    const url=this.url+`image/`+id
    return this.http.put(url,body)
  }
  
  public deleteImg(body:any){
    const url= this.url+`image/`+body.id
    return this.http.delete(url)
  }

}
