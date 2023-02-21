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
  public getAllAlquileru(token:any) {
    const url = environment.base_url + `alquileresu/`+token
    return this.http.get(url)
  }


  public postCreateAlquiler(body: any) {
    const url = environment.base_url + `alquileres`
    return this.http.post(url, body)
  }
  public postCreateAlquilervr(body: any) {
    const url = environment.base_url + `alqv`
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
  public getPagoAlicuota(token: any) {
    const url = environment.base_url + `alicuota/` + token
    console.log(url)
    return this.http.get(url)
  }
  public getPagoReservaciones(token: any) {
    const url = environment.base_url + `reservaciones/` + token
    return this.http.get(url)
  }

  public getdetAlicuota(id: any) {
    const url = environment.base_url + `detealleali/` + id
    return this.http.get(url)
  }

  public getResServicios() {
    const url = environment.base_url + `reservicios/`
    return this.http.get(url)
  }
  public getResServiciosS() {
    const url = environment.base_url + `reserviciosS/`
    return this.http.get(url)
  }


  public postCreateAlquileru(body: any) {
    const url = environment.base_url + `alquileru`
    return this.http.post(url, body)
  }
  
  public postCreateAlquilerv(body: any) {
    const url = environment.base_url + `alquilerv`
    return this.http.post(url, body)
  }


  // MULTAS

  public getTotalMulta(token:any) {
    const url = environment.base_url + `totalmulta/`+token
    return this.http.get(url)
  }
  public getDetMulta(token:any) {
    const url = environment.base_url + `detmulta/`+token
    console.log(url)
    return this.http.get(url)
  }


  //USER
  getUser(token: any) {
    // alert(form)
    let direccion =environment.base_url + "getUser/" + token;
    // alert(direccion)
    return this.http.get(direccion);
  }
}