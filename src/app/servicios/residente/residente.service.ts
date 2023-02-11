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
    const url = environment.base_url + `Residente/` + body.res_id
    return this.http.put(url, body)
  }

  public deleteResidente(res_id: any) {
    const url = environment.base_url + `Residente/` + res_id
    return this.http.delete(url)
  }

}