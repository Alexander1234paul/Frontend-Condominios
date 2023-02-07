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
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
