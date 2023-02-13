import { Component, OnInit } from '@angular/core';
import { ResidenteService } from '../../servicios/residente/residente.service';
import { ModelResidenteI } from '../../modelos/modelo.residente';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asiganciones',
  templateUrl: './asiganciones.component.html',
  styleUrls: ['./asiganciones.component.css']
})
export class AsigancionesComponent implements OnInit {
  condominos: ModelResidenteI[] = [];

  constructor(private residenteService: ResidenteService) { }

  formAsignacion = new FormGroup({
    res_id: new FormControl('', Validators.required),
    rol_id: new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this.showAllResidentes()
  
  }
  showAllResidentes() {
    this.residenteService.getAllCondominoA().subscribe(
      (residentes: any) => {
        this.condominos = residentes
        console.log(residentes)
      },
      (error) => console.log(error)
    );
  }

  updatetoCondomino(res_id: any) {
    this.formAsignacion.setValue({
      res_id: res_id,
      rol_id: ""
    })

    this.residenteService.putToCondomino(this.formAsignacion.value).subscribe((data: any) => {
      if (data.status == 'Error') {
        this.showModalMore('center', 'info', data.resp, false, 2000);

      } else {
        this.showAllResidentes();
        this.showModalMore('center', 'success', data.resp, false, 2000);

      }
    });
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
}
