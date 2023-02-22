import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { reporteService } from 'src/app/servicios/reporte/reporte.service';
import { ModelReporte } from 'src/app/modelos/Contabilidad/reporte.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  Reportes: ModelReporte[] = [];
  exportColumns: any[] = [];
  public form!: FormGroup;

  public informacionReportes = {
    rep_id: '',
    rep_total_cuotas: '',
    rep_total_alquileres: '',
    rep_total_multas: '',
    rep_total_gastos: ''
  }

  constructor(private reporteService: reporteService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cargarReportes()

    this.form = this.formBuilder.group({
      txtid: [''],
      txtcuotas: [''],
      txtalquileres: [''],
      txtmultas: [''],
      txtgastos: ['']
    })

  }

  // imprimirReporte() {import('jspdf').then(jsPDF => {
  //   import("jspdf-autotable").then(x => {
  //     const doc = new jsPDF.default();
  //     (doc as any).autoTable(this.exportColumns, this.Reportes)
  //     doc.save('reports.pdf');
  //   })
  // })

  // public imprimirReporte(){
  //   const doc = new jsPDF('portrait', 'pt', 'a4');

  //   doc.html('Reports');
  //   doc.save('reporte.pdf');
  // }

  public cargarReportes() {
    this.reporteService.getAllreporte().subscribe(
      (Reporte: any) => {
        this.Reportes = Reporte
        console.log(this.Reportes)
      },
      (error) => console.warn(error)
    )
  }

  public crearReporte() {
    this.reporteService.postCreatereporte({
      rep_id: this.form.value.txtid,
      rep_total_cuotas: this.form.value.txtcuotas,
      rep_total_alquileres: this.form.value.txtalquileres,
      rep_total_multas: this.form.value.txtmultas,
      res_id: this.form.value.txtgastos
    }).subscribe(res => {
      console.log('Nuevo reporte insertado')
      this.form.reset();
      this.cargarReportes()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El reporte se insertó correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }

  public eliminarReporte(rep_id: any) {
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
        this.reporteService.deletereporte(rep_id).subscribe(
          res => console.log('El reporte se ha eliminado correctamente'))
        this.cargarReportes();
        Swal.fire(
          'Eliminado',
          'El reporte ha sido eliminado',
          'success'
        )
      }
    })
  }

  public actualizarReporte(rep_id: any) {
    this.reporteService.putUpdatereporte({
      rep_id: rep_id,
      rep_total_cuotas: this.form.value.txtcuotas,
      rep_total_alquileres: this.form.value.txtalquileres,
      rep_total_multas: this.form.value.txtmultas,
      res_id: this.form.value.txtres
    }).subscribe(res => {
      console.log('Datos del reporte actualizados')
      this.cargarReportes()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Reporte actualizado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }

  public getCuotas(dpag_fecha: any) {
    this.reporteService.getCuotas(dpag_fecha).subscribe(
      (Reporte: any) => {
        this.Reportes = Reporte
        console.log(this.Reportes)
      },
      (error) => console.warn(error)
    )
  }

  public getAlquileres(alq_fecha: any) {
    this.reporteService.getAlquileres(alq_fecha).subscribe(
      (Reporte: any) => {
        this.Reportes = Reporte
        console.log(this.Reportes)
      },
      (error) => console.warn(error)
    )
  }

  public getMultas(mul_fecha: any) {
    this.reporteService.getMultas(mul_fecha).subscribe(
      (Reporte: any) => {
        this.Reportes = Reporte
        console.log(this.Reportes)
      },
      (error) => console.warn(error)
    )
  }

  public getGastos(ser_fecha: any) {
    this.reporteService.getGastos(ser_fecha).subscribe(
      (Reporte: any) => {
        this.Reportes = Reporte
        console.log(this.Reportes)
      },
      (error) => console.warn(error)
    )
  }

  public infoUpdateReporte(rep_id: any, rep_total_cuotas: any, rep_total_alquileres: any, rep_total_multas: any, rep_total_gastos: any) {
    this.informacionReportes.rep_id = rep_id;
    this.informacionReportes.rep_total_cuotas = rep_total_cuotas;
    this.informacionReportes.rep_total_alquileres = rep_total_alquileres;
    this.informacionReportes.rep_total_multas = rep_total_multas;
    this.informacionReportes.rep_total_gastos = rep_total_gastos;
  }
}

