import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {



  constructor(private http: HttpClient) { }

  public getAllAlquiler() {
    const url = environment.base_url + `alquileres`
    return this.http.get(url)
  }


  public postCreateAlquiler(body: any) {
    const url = environment.base_url + `alquileres`
    return this.http.post(url, body)
  }

  public putUpdateAlquiler(body: any) {
    console.log(body)
    const url = environment.base_url + `alquileres/` + body.alq_id
    return this.http.put(url, body)
  }

  public deleteAlquiler(Alquiler_id: any) {
    const url = environment.base_url + `alquileres/` + Alquiler_id
    return this.http.delete(url)
  }
  public getAlquiler(Alquiler_id: any) {
    const url = environment.base_url + `alquileres/` + Alquiler_id
    return this.http.get(url)
  }

}