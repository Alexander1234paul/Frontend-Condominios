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
import { ServiciosComponent } from './components/servicios/servicios.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { SubAlquilerComponent } from './components/sub-alquiler/sub-alquiler.component';
import { SubServicioComponent } from './components/sub-servicio/sub-servicio.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { DetalleServicioComponent } from './components/detalle-servicio/detalle-servicio.component';
import { DetallePagoComponent } from './components/detalle-pago/detalle-pago.component';
import { SubContabilidadComponent } from './components/sub-contabilidad/sub-contabilidad.component';
import { MultaComponent } from './components/multa/multa.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { SubReporteComponent } from './components/sub-reporte/sub-reporte.component';
import { CuentasPendientesComponent } from './components/cuentas-pendientes/cuentas-pendientes.component';
import { MovimientoContableComponent } from './components/movimiento-contable/movimiento-contable.component';
import { CondominoComponent } from './components/condomino/condomino.component';
import { AsignacionesCondominosComponent } from './components/asignaciones-condominos/asignaciones-condominos.component';
import { RolcondominoComponent } from './components/rolcondomino/rolcondomino.component';
import { FooterComponent } from './components/footer/footer.component';
import { MontoComponent } from './components/monto/monto.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "monto", component: MontoComponent },
  { path: "multa", component: MultaComponent },
  { path: "departamento", component: DepartamentoComponent },
  { path: "detallepago", component: DetallePagoComponent },
  { path: "footer", component: FooterComponent },
  { path: "residente", component: ResidenteComponent, canActivate: [UserGuardGuard] },
  { path: "main", component: MainComponent },
  {
    path: "administracion", component: AdministracionComponent, children: [
      {
        path: "condomino", component: CondominoComponent, children: [
          { path: "residente", component: ResidenteComponent },
          { path: "rolCondomino", component: RolcondominoComponent }
        ]
      }, {
        path: "asignacionCondominos", component: AsignacionesCondominosComponent
      }
      // , {
      //   path: "adminCondomino", component: a
      // }
    ]
  },
  {
    path: "contabilidad", component: ContabilidadComponent, children: [
      {
        path: "subContabilidad", component: SubContabilidadComponent, children: [
          { path: "detPago", component: DetallePagoComponent },
          { path: "multa", component: MultaComponent }
        ]
      },
      {
        path: "reporte", component: ReporteComponent, children: [
          { path: "subReporte", component: SubReporteComponent }
        ]
      }

    ]
  },
  {
    path: "reservaciones", component: ReservacionesComponent, children: [
      {
        path: "servicios", component: ServiciosComponent, children: [
          { path: "subServicio", component: SubServicioComponent },
          { path: "tipoServico", component: TipoServicioComponent },
          { path: "detalleServicio", component: DetalleServicioComponent }
        ]
      },
      {
        path: "alquiler", component: AlquilerComponent, children: [{
          path: "bien", component: BienComponent
        }, {
          path: "subAlquiler", component: SubAlquilerComponent
        }]
      }
    ]
  },
  {
    path: "seguridad", component: SeguridadComponent, children: [{
      path: "usuarioE", component: UsuarioexternoComponent
    }]
  },
  {
    path: "usuarios", component: UsuariosComponent, children: [
      { path: "cuentasPendientes", component: CuentasPendientesComponent },
      { path: "movimientoContable", component: MovimientoContableComponent }
    ]
  },
  { path: "bien", component: BienComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
