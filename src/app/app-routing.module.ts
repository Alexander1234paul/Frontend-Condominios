import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ResidenteComponent } from './components/residente/residente.component';
import { UserGuardGuard } from './user-guard.guard';
import { MainComponent } from './components/main/main.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { ContabilidadComponent } from './components/contabilidad/contabilidad.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { SeguridadComponent } from './components/seguridad/seguridad.component';
import { UsuarioexternoComponent } from './components/usuarioexterno/usuarioexterno.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { BienComponent } from './components/bien/bien.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "residente", component: ResidenteComponent, canActivate: [UserGuardGuard] },
  { path: "main", component: MainComponent },
  {
    path: "administracion", component: AdministracionComponent, children: [{
      path: "residente", component: ResidenteComponent
    }]
  },
  { path: "contabilidad", component: ContabilidadComponent },
  { path: "reservaciones", component: ReservacionesComponent },
  {
    path: "seguridad", component: SeguridadComponent, children: [{
      path: "usuarioE", component: UsuarioexternoComponent
    }]
  },
  { path: "usuarios", component: UsuariosComponent },
  {path:"bien",component:BienComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
