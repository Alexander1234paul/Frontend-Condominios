import { Component, OnInit } from '@angular/core';
import { ModelResidenteI } from '../../modelos/modelo.residente';
import { ResidenteService } from '../../servicios/residente/residente.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-residente',
  templateUrl: './residente.component.html',
  styleUrls: ['./residente.component.css']
})
export class ResidenteComponent implements OnInit {
  
  url: string = 'http://localhost:3000/';
  public page:number | undefined;
  ngOnInit(): void {
    this.getAllResidente();

  }
  residentes: ModelResidenteI[] | null | undefined;

  constructor(private residenteService: ResidenteService, private http: HttpClient, private cookieService: CookieService) { }
  desde: number = 0;
  hasta: number = 2;
  pageSize = 2;

  getAllResidente() {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = this.cookieService.get('token');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token)
    let direccion = this.url + "Residente";
    this.http.get<ModelResidenteI[]>(direccion, {
      headers: httpHeaders,
      observe: 'response'
    })
      .subscribe(res => {
        this.residentes = res.body;


      })
    const pageSidze = this.residentes?.length;
    console.log(this.pageSize)
  }

  cambiarpagina(e: PageEvent) {
    // console.log(e);

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde * e.pageSize;

  }
}
