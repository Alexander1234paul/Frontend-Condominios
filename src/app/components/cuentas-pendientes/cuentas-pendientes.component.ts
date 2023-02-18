import { Component, OnInit } from '@angular/core';
import { ResidenteService } from '../../servicios/residente/residente.service';
import { AlquilerService } from '../../servicios/alquiler/alquiler.service';
import { ModelDetAlicuotaI } from '../../modelos/modelo.detAli';
import { ModelResServicioaI } from '../../modelos/modelo.resservicio';

@Component({
  selector: 'app-cuentas-pendientes',
  templateUrl: './cuentas-pendientes.component.html',
  styleUrls: ['./cuentas-pendientes.component.css']
})
export class CuentasPendientesComponent implements OnInit {
  // Alicuota
  detAlicuota: ModelDetAlicuotaI[] = [];
  resServicio: ModelResServicioaI[] = [];


  alicuota: any;

  sumEgresos: any;
  idalicuota: any;
  estadoAlicuota: any;
  colorEstadoAlicuotaA: boolean = false;
  colorEstadoAlicuotaB: boolean = false;
  colorEstadoAlicuotaC: boolean = false;
  // Reservaciones
  reservaciones: any;
  estadoReservaciones: any;
  colorEstadoReservacionA: boolean = false;
  colorEstadoReservacionB: boolean = false;
  colorEstadoReservacionC: boolean = false;
  ngOnInit(): void {
    this.showAlicuota()
    this.showReservaciones()
    this.getresServicio();
    this.getresServicioS()
  }
  constructor(private alquilerService: AlquilerService) { }

  showAlicuota() {
    const token = localStorage.getItem("tokenAC")
    this.alquilerService.getPagoAlicuota(token).subscribe((data: any) => {
      this.alicuota = data.total
      this.idalicuota = data.ali_id;
      this.colorEstadoAlicuotaC = true;
      this.colorEstadoAlicuotaB = false;
      this.colorEstadoAlicuotaA = false;
      if (data == null) {
        this.reservaciones = 0
        this.estadoAlicuota = "SIN NOVEDAD"
      } else {
        if (data.dpag_estado) {
          this.estadoAlicuota = "CANCELADO"
          this.colorEstadoAlicuotaA = true;
          this.colorEstadoAlicuotaB = false;
          this.colorEstadoAlicuotaC = false;
        } else {
          this.estadoAlicuota = "PENDIENTE"
          this.colorEstadoAlicuotaB = true;
          this.colorEstadoAlicuotaA = false;
          this.colorEstadoAlicuotaC = false;
        }
      }

    })
  }

  showReservaciones() {
    const token = localStorage.getItem("tokenAC")
    this.alquilerService.getPagoReservaciones(token).subscribe((data: any) => {
      console.log(data)

      if (data == null) {
        this.reservaciones = 0
        this.estadoReservaciones = "SIN NOVEDAD"
        this.colorEstadoReservacionB = false;
        this.colorEstadoReservacionA = false;
        this.colorEstadoReservacionC = true;
      } else {
        if (data.dpag_estado) {
          this.reservaciones = data.total
          this.estadoReservaciones = "CANCELADO"
          this.colorEstadoReservacionB = false;
          this.colorEstadoReservacionA = true;
          this.colorEstadoReservacionC = false;
        } else {
          this.reservaciones = data.total
          this.estadoReservaciones = "PENDIENTE"
          this.colorEstadoReservacionB = true;
          this.colorEstadoReservacionA = false;
          this.colorEstadoReservacionC = false;

        }
      }

    })
  }

  getDataAlicuota() {
    this.alquilerService.getdetAlicuota(this.idalicuota).subscribe(
      (detAlicuota: any) => {
        this.detAlicuota = detAlicuota

      },
      (error) => console.log(error)
    );
  }
  getresServicio() {
    this.alquilerService.getResServicios().subscribe(
      (resServicio: any) => {
        this.resServicio = resServicio

      },
      (error) => console.log(error)
    );
  }

  getresServicioS() {
    this.alquilerService.getResServiciosS().subscribe(
      (sum: any) => {
        console.log(sum)
        this.sumEgresos = sum.suma
      },
      (error) => console.log(error)
    );
  }
  // getDataAlicuota() {
  //   console.log("asd",this.idalicuota)
  // }



}
