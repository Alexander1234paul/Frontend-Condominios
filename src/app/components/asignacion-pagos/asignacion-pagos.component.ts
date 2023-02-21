import { Component } from '@angular/core';

@Component({
  selector: 'app-asignacion-pagos',
  templateUrl: './asignacion-pagos.component.html',
  styleUrls: ['./asignacion-pagos.component.css']
})
export class AsignacionPagosComponent {

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
