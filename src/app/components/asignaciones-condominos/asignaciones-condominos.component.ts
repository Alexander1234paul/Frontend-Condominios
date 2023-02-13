import { Component } from '@angular/core';

@Component({
  selector: 'app-asignaciones-condominos',
  templateUrl: './asignaciones-condominos.component.html',
  styleUrls: ['./asignaciones-condominos.component.css']
})
export class AsignacionesCondominosComponent {
  activoA: boolean | undefined;
  activoB: boolean | undefined;
  activoC: boolean | undefined;


  changeActiveA() {
    this.activoA = true;
    this.activoB = false;
    this.activoC = false;


  }
  changeActiveB() {
    this.activoA = false;
    this.activoB = true;
    this.activoC = false;



  }
  changeActiveC() {
    this.activoA = false;
    this.activoB = false;
    this.activoC = true;


  }
}
