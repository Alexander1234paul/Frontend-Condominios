import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioEService } from 'src/app/servicios/UsuarioE/usuario-e.service';
import { ModelUsuarioExterno } from 'src/app/modelos/usuarioexterno/usuarioexterno.module';
import Swal from 'sweetalert2';
import { ModelPersona } from 'src/app/modelos/persona/persona.module';
@Component({
  selector: 'app-usuarioexterno',
  templateUrl: './usuarioexterno.component.html',
  styleUrls: ['./usuarioexterno.component.css']
})
export class UsuarioexternoComponent implements OnInit {

  usuariosexternos: ModelUsuarioExterno[] = [];
  personas: ModelPersona[] = [];
  public form!: FormGroup;

  idUpdatedUserExt: any

  public informacionUsuariosExternos = {
    use_id: -1,
    per_id: "",
    per_nombres: "",
    per_apellidos: "",
    use_fecha: "",
    use_descripcion: "",
  }

  constructor(private usuarioEService: UsuarioEService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cargarUsuariosExternos();
    this.cargarPersonas();

    this.form = this.formBuilder.group({

      per_id: [''],
      per_nombres: [''],
      per_apellidos: [''],
      use_fecha: [''],
      use_descripcion: ['']
    })

  }

  public cargarUsuariosExternos() {
    this.usuarioEService.getAllUsuarioExterno().subscribe(
      (usuario: any) => {
        this.usuariosexternos = usuario
        console.log(usuario)
        console.log(this.usuariosexternos)
      },
      (error) => console.warn(error)
    )
  }

  public cargarPersonas() {
    this.usuarioEService.getAllPersona().subscribe(
      (persona: any) => {
        this.personas = persona
        console.log(this.personas)
      },
      (error) => console.warn(error)
    )
  }

  public crearUsuarioExterno() {
    this.usuarioEService.postCreateUsuarioExterno({
      per_id: this.form.value.per_id,
      per_nombres: this.form.value.per_nombres,
      per_apellidos: this.form.value.per_apellidos,
      use_fecha: this.form.value.use_fecha,
      use_descripcion: this.form.value.use_descripcion
    }).subscribe(res => {
      console.log('Nuevo usuario externo insertado')
      this.form.reset()
      this.cargarUsuariosExternos()
    })
  }

  public eliminarUsuarioExterno(use_id: any) {
    Swal.fire({
      title: '¿Está seguro de borrar?',
      text: 'No podrá revertir esta acción!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#91C788',
      cancelButtonColor: '#FFAAA7',
      confirmButtonText: 'Sí, deseo eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioEService.deleteUsuarioExterno(use_id).subscribe(res => console.log('El usuario externo se ha eliminado correctamente'))
        this.cargarUsuariosExternos()
        Swal.fire(
          'Eliminado',
          'El usuario externo ha sido eliminado',
          'success'
        )
      }
    })
  }

  // 

  public actualizarUsuarioExterno() {
    this.usuarioEService.putUpdateUsuarioExterno({
      use_id: this.idUpdatedUserExt,
      per_id: this.form.value.per_id,
      per_nombres: this.form.value.per_nombres,
      per_apellidos: this.form.value.per_apellidos,
      use_fecha: this.form.value.use_fecha,
      use_descripcion: this.form.value.use_descripcion
    }).subscribe(res => {
      console.log('Datos del usuario externo actualizados')

    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario externo actualizado exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
    this.form.reset()
    this.cargarUsuariosExternos()
  }

  public infoUpdateUsuarioExterno(userExt: any) {
    this.informacionUsuariosExternos.use_id = this.idUpdatedUserExt = userExt.use_id
    this.form.controls["per_id"].setValue(userExt.per_id)
    this.form.controls["per_nombres"].setValue(userExt.per_nombres)
    this.form.controls["per_apellidos"].setValue(userExt.per_apellidos);
    this.form.controls["use_fecha"].setValue(userExt.use_fecha)
    this.form.controls["use_descripcion"].setValue(userExt.use_descripcion)
  }

  // public infoUpdateUsuarioExterno(use_id: any,per_id:any,per_nombres:any,per_apellidos:any,use_fecha:any, use_descripcion: any) {
  //   this.informacionUsuariosExternos.use_id = use_id;
  //   this.informacionUsuariosExternos.per_id = per_id;
  //   this.informacionUsuariosExternos.per_nombres = per_nombres;
  //   this.informacionUsuariosExternos.per_apellidos = per_apellidos;
  //   this.informacionUsuariosExternos.use_fecha = use_fecha;
  //   this.informacionUsuariosExternos.use_descripcion=use_descripcion;
  // }

  selectedOption: string = ""
}
