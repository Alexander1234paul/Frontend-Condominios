import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {tap} from 'rxjs/operators';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TipoServicioService {

  public _refresh$ = new Subject<void>()

  url= environment.base_url;
  constructor(private http: HttpClient) { }
  
  public getAllTipoServicio(){
    const url=this.url+`tipo_servicios`
    return this.http.get(url)
  }

  public postCreateTipoServicio(body:any){
    const url=this.url+`tipo_servicio`
    return this.http.post(url,body)
    .pipe(
      tap(() =>{
        this._refresh$.next();
      }) 
    );
  }
  public putUpdateTipoServicio(body:any){
    console.log(body)
    const url=this.url+`tipo_servicio/`+body.tser_id
    return this.http.put(url,body)
  }
  
  public deleteTipoServicio(tser_id:any){
    const url= this.url+`tipo_servicio/`+tser_id
    return this.http.delete(url)
  }

}
