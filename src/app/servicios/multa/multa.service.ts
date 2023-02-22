import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MultaService {

  constructor(private http: HttpClient) { }

  public getAllMulta(){
    const url = environment.base_url + `multa`
    return this.http.get(url)
  }

  public getAllRes(){
    const url = environment.base_url + `resmulta`
    return this.http.get(url)
  }

  public postCreateMulta(body: any) {
    const url = environment.base_url + `multa`
    return this.http.post(url, body)
  }

  public verMultas() {
    const url = environment.base_url + `vmulta`
    return this.http.get(url)
  }

  public putUpdateMulta(body: any) {
    console.log(body)
    const url = environment.base_url + `multa/` + body.mul_id
    return this.http.put(url, body)
  }

  public pagarMulta(body: any) {
    
    const url = environment.base_url + `multae/` + body
    // alert(url)
    return this.http.get(url)
  }

  public deleteMulta(mul_id: any) {
    const url = environment.base_url + `multa/` + mul_id
    return this.http.delete(url)
  }
}
