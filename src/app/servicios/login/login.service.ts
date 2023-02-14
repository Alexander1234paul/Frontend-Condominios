import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = 'https://condominio-api.up.railway.app/';
  constructor(private http: HttpClient) { }

  // getAllAutoridades() {
  //   let direccion = this.url + "autoridades";
  //   return this.http.get(direccion);
  // }

  Login(form: any) {
    let direccion = environment.base_url + "auth";
    return this.http.post(direccion, form);
  }
  // updateAutoridad(form: any) {
  //   let direccion = this.url + "autoridades";
  //   return this.http.put(direccion, form);
  // }
}
