import { Component, OnInit } from '@angular/core';
import { ModelResidenteI } from '../../modelos/modelo.residente';
import { RolresService } from '../../servicios/rolres/rolres.service';
import { ModelRolResidenteI } from '../../modelos/adminitración/rolConfomino';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
    rol_id: new FormControl(''),
    rol_descripcion: new FormControl('')
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
    // if (this.nClienteForm.valid) {
      console.log(form)
    this.rolServices.postCreateRol(form).subscribe(data => {
      this.showAllRol();

      // this.cleanForm();
      // this.showModalMore('center', 'success', 'Cliente registrado exitosamente', false, 2000);
      // this.ShowModal('Cliente','Clientre registrado existosamente!','success');
    })

    // } else {
    //   this.ShowModal('Cliente', 'Error al registrar cliente', 'error');
    //   console.log(this.nClienteForm.valid)
    // }

  }
}
