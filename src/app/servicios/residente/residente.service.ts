import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ModelResidenteI } from '../../modelos/modelo.residente';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ResidenteService {


  constructor(private http: HttpClient) { }

  public getAllResidente() {
    const url = environment.base_url + `Residente`
    return this.http.get(url)
  }
  public getAllCondomino() {
    const url = environment.base_url + `Condomino`
    return this.http.get(url)
  }
  public getAllCondominoA() {
    const url = environment.base_url + `CondominoA`
    return this.http.get(url)
  }

  public getResidente(per_id: any) {
    const url = environment.base_url + `Residente/` + per_id;
    return this.http.get(url)
  }
  public getAllDepartamento() {
    const url = environment.base_url + `Departamento`
    return this.http.get(url)
  }

  public postCreateResidente(body: any) {
    const url = environment.base_url + `Residente`
    return this.http.post(url, body)
  }

  public putUpdateResidente(body: any) {
    console.log(body)
    const url = environment.base_url + `Residente/` + body.per_id
    return this.http.put(url, body)
  }

  public putAsignar(body: any) {
 
    const url = environment.base_url + `Condomino/` + body.res_id
    return this.http.put(url, body)
  }


  public putHabitante(body: any) {
 
    const url = environment.base_url + `Habitante/` + body.res_id
    return this.http.put(url, body)
  }

  public putToCondomino(body: any) {
 
    const url = environment.base_url + `toCondomino/` + body.res_id
    return this.http.put(url, body)
  }


  public deleteResidente(res_id: any) {
    const url = environment.base_url + `Residente/` + res_id
    return this.http.delete(url)
  }

}