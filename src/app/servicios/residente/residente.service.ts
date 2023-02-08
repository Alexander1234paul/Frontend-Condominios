import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ModelResidenteI } from '../../modelos/modelo.residente';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResidenteService {

  // url: string = 'https://condominio-api.up.railway.app/';
  // constructor(private http: HttpClient, private cookieService: CookieService) { }

  // getAllResidente() {
  //   let httpHeaders: HttpHeaders = new HttpHeaders();
  //   const token = this.cookieService.get('token');
  //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token)
  //   let direccion = this.url + "Residente";
  //   return this.http.get(direccion, {
  //     headers: httpHeaders,
  //     observe: 'response'
  //   })
  //     .subscribe(res => {
  //       console.log(res.body)
  //       return res
  //     })
  // }

  url: string = 'https://condominio-api.up.railway.app/';
  constructor(private http: HttpClient) { }
  
  public getAllBien(){
    const url=this.url+`Residente`
    return this.http.get(url)
  }

  public postCreateBien(body:any){
    const url=this.url+`Residente`
    return this.http.post(url,body)
  }

  public putUpdateBien(body:any){
    console.log(body)
    const url=this.url+`Residente/`+body.bien_id
    return this.http.put(url,body)
  }
  
  public deleteBien(bien_id:any){
    const url= this.url+`Residente/`+bien_id
    return this.http.delete(url)
  }
}