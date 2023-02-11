import { Component, OnInit } from '@angular/core';
import { ModelResidenteI } from '../../modelos/modelo.residente';
import { RolresService } from '../../servicios/rolres/rolres.service';
import { ModelRolResidenteI } from '../../modelos/adminitración/rolConfomino';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-rolcondomino',
  templateUrl: './rolcondomino.component.html',
  styleUrls: ['./rolcondomino.component.css']
})
export class RolcondominoComponent implements OnInit {

  // VARIABLES
  roles: ModelRolResidenteI[] = [];

  //FORMS

  formRol = new FormGroup({
    rol_descripcion: new FormControl('', Validators.required)
  }
  );
  formRolUpdate = new FormGroup({
    rol_id: new FormControl('', Validators.required),
    rol_descripcion: new FormControl('', Validators.required)
  }
  );
  //CONSTRTRUCTOR
  constructor(private rolServices: RolresService) { }
  //INICIO
  ngOnInit(): void {
    this.showAllRol();

  }



  //METODOS
  showAllRol() {
    this.rolServices.getAllRol().subscribe(
      (roles: any) => {
        this.roles = roles
        console.log(this.roles)
      },
      (error) => console.log(error)
    );
  }
  public crearRol(form: any) {
    if (this.formRol.valid) {
      this.rolServices.postCreateRol(form).subscribe(data => {
        this.showAllRol();
        this.showModalMore('center', 'success', 'Registrado existoso', false, 2000);
      })

    } else {
      this.ShowModal('', 'El campo se encuentra vació', 'error');

    }

  }

  public eliminarRol(rol_id: any) {
    this.rolServices.deleteRol(rol_id).subscribe(data => {
      this.showAllRol();
      this.showModalMore('center', 'success', 'Eliminado correctamente', false, 2000);
    })
  }

  public actualizarRol(form: any) {
    if (this.formRolUpdate.valid) {
      this.rolServices.putUpdateRol(form).subscribe(data => {
        this.showAllRol();
        this.showModalMore('center', 'success', 'Registrado existoso', false, 2000);
      })
    } else {
      this.ShowModal('', 'El campo se encuentra vació', 'error');

    }
  }

  public getDataRol(id_rol: any, descripcion: any) {
    this.formRolUpdate.setValue({
      rol_id: id_rol,
      rol_descripcion: descripcion
    })
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
