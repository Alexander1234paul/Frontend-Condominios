import { Component, OnInit } from '@angular/core';
import { ModelResidenteI } from 'src/app/modelos/modelo.residente';
import { ResidenteService } from '../../servicios/residente/residente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelRolResidenteI } from '../../modelos/adminitración/rolConfomino';
import { RolresService } from '../../servicios/rolres/rolres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcondomino',
  templateUrl: './subcondomino.component.html',
  styleUrls: ['./subcondomino.component.css']
})
export class SubcondominoComponent implements OnInit {


  Condominos: ModelResidenteI[] = [];
  roles: ModelRolResidenteI[] = [];
  selectedOption: string = ""

  formAsignacion = new FormGroup({
    res_id: new FormControl('', Validators.required),
    rol_id: new FormControl('', Validators.required),
  }
  )

  ngOnInit(): void {
    this.showAllCondominos()

  }
  showAllRol() {
    this.rolServices.getAllRolA().subscribe(
      (roles: any) => {
        this.roles = roles
        console.log(this.roles)
      },
      (error) => console.log(error)
    );
  }
  constructor(private residenteService: ResidenteService, private rolServices: RolresService) { }

  showAllCondominos() {
    this.residenteService.getAllCondomino().subscribe(
      (residentes: any) => {
        this.Condominos = residentes
        console.log(residentes)
      },
      (error) => console.log(error)
    );
  }

  getDataResidente(res_id: any) {
    this.formAsignacion.setValue({
      res_id: res_id,
      rol_id: ""
    })
    this.showAllRol();

  }
  asignar(form: any) {
    if (this.formAsignacion.valid) {
      this.residenteService.putAsignar(form).subscribe((data: any) => {
        if (data.status == 'Error') {
          this.showModalMore('center', 'info', data.resp, false, 2000);

        } else {
          this.showModalMore('center', 'success', data.resp, false, 2000);

        }
      })

    } else {
      this.ShowModal('', 'Seleccione el rol del usuario', 'error');

    }

  }
  updatetoHabitante(res_id: any) {
    this.formAsignacion.setValue({
      res_id: res_id,
      rol_id: ""
    })

    this.residenteService.putHabitante(this.formAsignacion.value).subscribe((data: any) => {
      if (data.status == 'Error') {
        this.showModalMore('center', 'info', data.resp, false, 2000);

      } else {
        this.showAllCondominos();
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
