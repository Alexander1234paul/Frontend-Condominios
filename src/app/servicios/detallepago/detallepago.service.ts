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

  public getPagosByID(body:any){
    const url=environment.base_url+`pagos/`+body.ali_id
    return this.http.get(url)
  }

  public postPagoById(body: any) {
    const url = `${environment.base_url}pago_id/${body.ali_id}`;
    return this.http.post(url, body)
  }

  //Alicuotas
  public postCreateCuota(body: any) {
    const url = environment.base_url + `cuota`
    return this.http.post(url, body)
  }

  public getAllAlicuotas(){
    const url = environment.base_url + `alicuota`
    return this.http.get(url)
  }

  public getAllCuotas(){
    const url = environment.base_url + `cuota`
    return this.http.get(url)
  }

  public putUpdatePago(body: any) {
    console.log(body)
    const url = environment.base_url + `pago/` + body.pag_id
    return this.http.put(url, body)
  }

  public putUpdateAlicuota(body: any) {
    console.log(body)
    const url = environment.base_url + `alicuota/` + body.ali_id
    return this.http.put(url, body)
  }

  public deletePago(body: any) {
    const url = environment.base_url + `pago/${body.pag_id}/${body.ali_id}`;
    return this.http.delete(url)
  }

  public putUpPagoEstado(body: any) {
    const url = environment.base_url + `detalle_pago/${body.dpag_id}/${body.res_correo}`;
    return this.http.put(url, body)
  }

  public deleteAlicuota(body: any) {
    const url = environment.base_url + `alicuota/` + body.ali_id
    return this.http.delete(url)
  }
}
