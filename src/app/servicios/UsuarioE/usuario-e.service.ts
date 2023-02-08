import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioEService {
  url: string = 'https://condominio-api.up.railway.app/';
  constructor(private http: HttpClient) { }

  public getAllBien() {
    const url = this.url + `usuarioExterno`
    return this.http.get(url)
  }

  public postCreateBien(body: any) {
    const url = this.url + `usuarioExterno`
    return this.http.post(url, body)
  }

  public putUpdateBien(body: any) {
    console.log(body)
    const url = this.url + `usuarioExterno/` + body.bien_id
    return this.http.put(url, body)
  }

  public deleteBien(bien_id: any) {
    const url = this.url + `usuarioExterno/` + bien_id
    return this.http.delete(url)
  }
}