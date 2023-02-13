import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetallepagoService {

  constructor(private http: HttpClient) { }

  public getAllDetPago(){
    const url = environment.base_url + `detalle_pago`
    return this.http.get(url)
  }

  public postCreateDetPago(body: any) {
    const url = environment.base_url + `detalle_pago`
    return this.http.post(url, body)
  }

  public putUpdateDetPago(body: any) {
    console.log(body)
    const url = environment.base_url + `detalle_pago/` + body.dcuo_id
    return this.http.put(url, body)
  }

  public deleteDetPago(dcuo_id: any) {
    const url = environment.base_url + `detalle_pago/` + dcuo_id
    return this.http.delete(url)
  }
}
