import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MontoService {

  url: string = 'https://condominio-api.up.railway.app/';
  constructor(private http: HttpClient) { }

  public getAllMonto(){
    const url = environment.base_url + `monto`
    return this.http.get(url)
  }

  public postCreateMonto(body: any) {
    const url = environment.base_url + `monto`
    return this.http.post(url, body)
  }

  public putUpdateMonto(body: any) {
    console.log(body)
    const url = environment.base_url + `monto/` + body.mon_id
    return this.http.put(url, body)
  }

  public deleteMonto(mon_id: any) {
    const url = environment.base_url + `monto/` + mon_id
    return this.http.delete(url)
  }
}
