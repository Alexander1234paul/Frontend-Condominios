import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DetalleServicioService } from 'src/app/servicios/reservaciones/servicios/detalleServicio.service';
import { ImgService } from 'src/app/servicios/image/image.service';
import { ModelDetalleServicio } from 'src/app/modelos/reservaciones/servicios/detalleServicio.module';
import { ModelImg } from 'src/app/modelos/reservaciones/servicios/img.module';
import { ModelServicio } from 'src/app/modelos/reservaciones/servicios/servicio.module';

import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css'],
})
export class DetalleServicioComponent {
  detalleServicios: ModelDetalleServicio[] = [];
  ImgServicios: ModelImg[] = [];
  public form!: FormGroup;
  files: any;
  ModelServicio: ModelServicio[]=[]
  selectedOption: string = ""
  selectedOption2: string = ""


  public informaciondetalleServicio = {
    dser_id: -1,
    dser_evidencia: '',
    ser_id: -1,
    ser_descripcion: '',
  };

  public informacionImg = {
    _id: -1,
    name: '',
    userImage: '',
    imageUrl:''
  };
  imageUrl: any;

  constructor(
    private BrowserModule: BrowserModule,
    private FormsModule: FormsModule,
    private ReactiveFormsModule: ReactiveFormsModule,
    private HttpClientModule: HttpClientModule,
    private http: HttpClient,
    private detalleServicioService: DetalleServicioService,
    private imgService: ImgService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargardetalleServicio();
    this.cargarImg();
    this.cargarServicio();
    this.form = this.formBuilder.group({
      txtevidencia: [''],
      txtser_id: [''],
      txtname: [''],
      txtuserImage: [''],
    });
  }

  public cargardetalleServicio() {
    this.detalleServicioService.getAllDetalleServicio().subscribe(
      (detalleServicio: any) => {
        this.detalleServicios = detalleServicio;
        console.log(this.detalleServicios);
      },
      (error) => console.warn(error)
    );
  }
  public cargarServicio() {
    this.detalleServicioService.getAllServicio().subscribe(
      (detalleServicio: any) => {
        this.ModelServicio = detalleServicio;
        console.log(this.ModelServicio);
      },
      (error) => console.warn(error)
    );
  }


  public creardetalleServicio() {
    let fd = new FormData();
    fd.append('name', this.form.value.txtname);
    fd.append('userImage', this.files[0]);
    this.imgService.postCreateImg(fd).subscribe((res) => {
      console.log('Imagen insertada');
    });
    this.detalleServicioService
      .postCreateDetalleServicio({
        dser_evidencia: this.form.value.txtname,
        ser_id: this.form.value.txtser_id,
      })
      .subscribe((res) => {
        console.log('Nuevo Detalle Servicio insertado');
      });
    this.cargarImg();
    this.form.reset();
    this.cargardetalleServicio();
  }

  public eliminardetalleServicio(dser_id: any) {
    this.detalleServicioService
      .deleteDetalleServicio(dser_id)
      .subscribe((res) =>
        console.log('El Detalle servicio se ha eliminado correctamente')
      );
    this.cargardetalleServicio();
  }

  public actualizardetalleServicio(dser_id: any) {
    this.detalleServicioService
      .putUpdateDetalleServicio({
        dser_id: dser_id,
        dser_evidencia: this.form.value.txtevidencia,
        ser_id: this.form.value.txtser_id,
      })
      .subscribe((res) => {});
    console.log('Datos del Detalle servicio actualizados');
    this.cargardetalleServicio();
  }
  public infoUpdatedetalleServicio(
    dser_id: any,
    dser_evidencia: any,
    ser_id: any,
    ser_descripcion: any
  ) {
    this.informaciondetalleServicio.dser_id = dser_id;
    this.informaciondetalleServicio.dser_evidencia = dser_evidencia;
    this.informaciondetalleServicio.ser_id = ser_id;
    this.informaciondetalleServicio.ser_descripcion = ser_descripcion;
  }
  // imagen
  public cargarImg() {
    this.imgService.getAllImg().subscribe(
      (imgServicio: any) => {
        this.ImgServicios = imgServicio;
        console.log(this.ImgServicios);
      },
      (error) => console.warn(error)
    );
  }

  public crearImg() {
    let fd = new FormData();
    fd.append('name', this.form.value.txtname);
    fd.append('userImage', this.files[0]);
    this.imgService.postCreateImg(fd).subscribe((res) => {
      console.log('Imagen insertada');
    });
    this.form.reset();
    this.cargarImg();
  }

  public eliminarImg(_id: any) {
    this.imgService
      .deleteImg(_id)
      .subscribe((res) => console.log('Imagen eliminada correctamente'));
    this.cargarImg();
  }

  public actualizarImg(_id: any) {
    this.imgService
      .putUpdateImg({
        _id: _id,
        userImage: this.files[0],
      })
      .subscribe((res) => {});
    console.log('Imagen actualizada');
    this.cargardetalleServicio();
  }
  public infoUpdateImg(_id: any, name: any, ser_id: any, userImage: any) {
    this.informacionImg._id = _id;
    this.informacionImg.name = name;
    this.informacionImg.userImage = userImage;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }
}
