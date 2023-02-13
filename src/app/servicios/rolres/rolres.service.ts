import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolresService {

  constructor(private http: HttpClient) { }

  public getAllRol() {
    const url = environment.base_url + `rol_residentes`
    return this.http.get(url)
  }
  
  public getAllRolA() {
    const url = environment.base_url + `rol_residentesA`
    return this.http.get(url)
  }

  public postCreateRol(body: any) {
    const url = environment.base_url + `rol_residente`
    return this.http.post(url, body)
  }

  public putUpdateRol(body: any) {
    console.log(body)
    const url = environment.base_url + `rol_residente/` + body.rol_id
    return this.http.put(url, body)
  }

  public deleteRol(rol_id: any) {
    const url = environment.base_url + `rol_residente/` + rol_id
    return this.http.delete(url)
  }

}