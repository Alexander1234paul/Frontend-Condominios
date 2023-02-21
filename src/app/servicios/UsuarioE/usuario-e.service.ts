import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioEService {
  url= environment.base_url;
  constructor(private http: HttpClient) { }

  public getAllUsuarioExterno() {
    const url = environment.base_url + `usuarioExterno`
    return this.http.get(url)
  }

  public getAllPersona() {
    const url = environment.base_url + `Persona`
    return this.http.get(url)
  }

  public postCreateUsuarioExterno(body: any) {
    const url = environment.base_url + `usuarioExterno`
    return this.http.post(url, body)
  }

  public putUpdateUsuarioExterno(body: any) {
    console.log(body)
    const url = environment.base_url + `usuarioExterno/` + body.use_id
    return this.http.put(url, body)
  }

  public deleteUsuarioExterno(use_id: any) {
    const url = environment.base_url + `usuarioExterno/` + use_id
    return this.http.delete(url)
  }
}