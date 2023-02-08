import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolresService {

  // url: string = 'https://condominio-api.up.railway.app/';
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  public getAllRol() {
    const url = this.url + `rol_residentes`
    return this.http.get(url)
  }

  public postCreateRol(body: any) {
    const url = this.url + `rol_residente`
    return this.http.post(url, body)
  }

  public putUpdateBien(body: any) {
    console.log(body)
    const url = this.url + `rol_residentes/` + body.bien_id
    return this.http.put(url, body)
  }

  public deleteBien(bien_id: any) {
    const url = this.url + `rol_residentes/` + bien_id
    return this.http.delete(url)
  }

}