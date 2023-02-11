import { Component, OnInit } from '@angular/core';
import { ModelResidenteI } from '../../modelos/modelo.residente';
import { ResidenteService } from '../../servicios/residente/residente.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModelDepartamentoI } from '../../modelos/adminitración/Departamento';




@Component({
  selector: 'app-residente',
  templateUrl: './residente.component.html',
  styleUrls: ['./residente.component.css']
})
export class ResidenteComponent implements OnInit {

  residentes: ModelResidenteI[] = [];
  departamento: ModelDepartamentoI[] = [];


  formResidente = new FormGroup({
    per_id: new FormControl('', Validators.required),
    per_nombres: new FormControl('', Validators.required),
    per_apellidos: new FormControl('', Validators.required),
    res_correo: new FormControl(''),
    res_telefono: new FormControl(''),
    res_usuario: new FormControl(''),
    res_clave: new FormControl(''),
    accion: new FormControl(''),
    departamento_id: new FormControl('', Validators.required)
  }
  );

  formResidenteUpdate = new FormGroup({
    per_id: new FormControl('', Validators.required),
    per_nombres: new FormControl('', Validators.required),
    per_apellidos: new FormControl('', Validators.required),
    res_correo: new FormControl(''),
    res_telefono: new FormControl(''),
    res_id: new FormControl('', Validators.required)
  }
  );
  ngOnInit(): void {
    this.showAllResidentes();
    this.showAllDepartamentos();
  }
  constructor(private residenteService: ResidenteService) { }

  showAllResidentes() {
    this.residenteService.getAllResidente().subscribe(
      (residentes: any) => {
        this.residentes = residentes
        console.log(residentes)
      },
      (error) => console.log(error)
    );
  }


  showAllDepartamentos() {
    this.residenteService.getAllDepartamento().subscribe(
      (departamento: any) => {
        this.departamento = departamento
        console.log(departamento)
      },
      (error) => console.log(error)
    );
  }


  createResidente(form: any) {

    if (this.formResidente.valid) {
      alert(this.activoA)
      if (this.activoA == false) {
        alert("entro aqui")
        this.formResidente.setValue({
          per_id: form.per_id,
          per_nombres: form.per_nombres,
          per_apellidos: form.per_apellidos,
          res_correo: form.res_correo,
          res_telefono: form.res_telefono,
          res_usuario: form.res_usuario,
          res_clave: form.res_clave,
          accion: "true",
          departamento_id: form.departamento_id,
        })

        this.residenteService.postCreateResidente(this.formResidente.value).subscribe(
          (data: any) => {
            // console.log(data)
            this.showAllResidentes()
            this.formResidente.reset();
            this.showModalMore('center', 'success', 'Registrado existoso', false, 2000);
          },
          (error) => console.log(error)
        );
      } else {
        this.residenteService.postCreateResidente(form).subscribe(
          (data: any) => {
            // console.log(data)
            this.showAllResidentes()
            this.formResidente.reset();
            this.showModalMore('center', 'success', 'Registrado existoso', false, 2000);
          },
          (error) => console.log(error)
        );
      }

    } else {
      // this.formResidente.reset();
      this.ShowModal('', 'Algún campo se encuentra vació', 'error');

    }
  }
  getDataResidente(res_id: any) {

  }
  deleteResidente(res_id: any) {
    this.residenteService.deleteResidente(res_id).subscribe(data => {
      this.showAllResidentes();
      this.showModalMore('center', 'success', 'Eliminado correctamente', false, 2000);
    })
  }
  updateResidente() {

  }


  ShowModal(title: any, infor: any, tipo: any) {
    Swal.fire(title, infor, tipo);
  }
  showModalMore(position: any, icon: any, title: any, showConfirmButton: any, timer: any) {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: showConfirmButton,
      timer: timer
    });
  }
  selectedOption: string = ""


  activoA: boolean = true;

  changeActiveA() {
    this.activoA = false;

    // alert(this.activoA)

  }
  changeActiveB() {
    this.activoA = true;


  }




















  //   url: string = 'http://localhost:3000/';
  //   public page: number | undefined;
  //   ngOnInit(): void {
  //     this.getAllResidente();

  //   }
  //   residentes: ModelResidenteI[] | null | undefined;

  //   constructor(private residenteService: ResidenteService, private http: HttpClient, private cookieService: CookieService) { }
  //   desde: number = 0;
  //   hasta: number = 2;
  //   pageSize = 2;

  //   getAllResidente() {
  //     let httpHeaders: HttpHeaders = new HttpHeaders();
  //     const token = this.cookieService.get('token');
  //     httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token)
  //     let direccion = this.url + "Residente";
  //     this.http.get<ModelResidenteI[]>(direccion, {
  //       headers: httpHeaders,
  //       observe: 'response'
  //     })
  //       .subscribe(res => {
  //         this.residentes = res.body;


  //       })
  //     const pageSidze = this.residentes?.length;
  //     console.log(this.pageSize)
  //   }

  //   cambiarpagina(e: PageEvent) {
  //     this.desde = e.pageIndex * e.pageSize;
  //     this.hasta = this.desde * e.pageSize;
  //   }
}
