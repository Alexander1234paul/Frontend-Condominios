import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResidenteComponent } from './components/residente/residente.component';
import { UsuarioexternoComponent } from './components/usuarioexterno/usuarioexterno.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContabilidadComponent } from './components/contabilidad/contabilidad.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { SeguridadComponent } from './components/seguridad/seguridad.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { BienComponent } from './components/bien/bien.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { SubAlquilerComponent } from './components/sub-alquiler/sub-alquiler.component';
import { SubServicioComponent } from './components/sub-servicio/sub-servicio.component';
import { DetalleServicioComponent } from './components/detalle-servicio/detalle-servicio.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { SubContabilidadComponent } from './components/sub-contabilidad/sub-contabilidad.component';
import { SubReporteComponent } from './components/sub-reporte/sub-reporte.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { MultaComponent } from './components/multa/multa.component';
import { DetallePagoComponent } from './components/detalle-pago/detalle-pago.component';
import { CuentasPendientesComponent } from './components/cuentas-pendientes/cuentas-pendientes.component';
import { MovimientoContableComponent } from './components/movimiento-contable/movimiento-contable.component';
import { CondominoComponent } from './components/condomino/condomino.component';
import { RolcondominoComponent } from './components/rolcondomino/rolcondomino.component';
import { AsignacionesCondominosComponent } from './components/asignaciones-condominos/asignaciones-condominos.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DropdownModule } from 'primeng/dropdown';
import { DetallecuotaComponent } from './components/detallecuota/detallecuota.component';
import { MontoComponent } from './components/monto/monto.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { SubcondominoComponent } from './components/subcondomino/subcondomino.component';
import { AsigancionesComponent } from './components/asiganciones/asiganciones.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { PagoComponent } from './components/pago/pago.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResidenteComponent,
    UsuarioexternoComponent,
    ContabilidadComponent,
    ReservacionesComponent,
    UsuariosComponent,
    AdministracionComponent,
    SeguridadComponent,
    HeaderComponent,
    FooterComponent,
    BienComponent,
    ServiciosComponent,
    AlquilerComponent,
    SubAlquilerComponent,
    SubServicioComponent,
    DetalleServicioComponent,
    TipoServicioComponent,
    SubContabilidadComponent,
    SubReporteComponent,
    ReporteComponent,
    MultaComponent,
    DetallePagoComponent,
    CuentasPendientesComponent,
    MovimientoContableComponent,
    CondominoComponent,
    RolcondominoComponent,
    AsignacionesCondominosComponent,
    DetallecuotaComponent,
    MontoComponent,
    DepartamentoComponent,
    SubcondominoComponent,
    AsigancionesComponent,
    VehiculoComponent,
    PagoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
