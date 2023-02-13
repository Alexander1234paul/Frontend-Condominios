import { Component, OnInit } from '@angular/core';
import { ModelAlquilerI } from '../../modelos/modelo.alquiler';
import { AlquilerService } from '../../servicios/alquiler/alquiler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BienService } from '../../servicios/bien/bien.service';
import { ModelBien } from '../../modelos/bien/bien.module';
import { ModelResidenteI } from '../../modelos/modelo.residente';
import { ResidenteService } from '../../servicios/residente/residente.service';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import Swal from 'sweetalert2';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-sub-alquiler',
  templateUrl: './sub-alquiler.component.html',
  styleUrls: ['./sub-alquiler.component.css']
})
export class SubAlquilerComponent implements OnInit {
  constructor(private aquilerServices: AlquilerService, private bienService: BienService,
    private residenteService: ResidenteService,HttpClientModule:HttpClientModule,HttpClientTestingModule:HttpClientTestingModule,
    DropdownModule:DropdownModule) { }

  alquileres: ModelAlquilerI[] = [];
  bienes: ModelBien[] = [];
  condominos: ModelResidenteI[] = [];


  formAlquiler = new FormGroup({
    res_id: new FormControl('', Validators.required),
    bien_id: new FormControl('', Validators.required),
    alq_fecha: new FormControl('', Validators.required),
    alq_hora_inicio: new FormControl('', Validators.required),
    alq_hora_fin: new FormControl('', Validators.required),
    alq_total: new FormControl('', Validators.required),

  });

  formAlquilerUpdate = new FormGroup({
    alq_id: new FormControl('', Validators.required),
    res_id: new FormControl('', Validators.required),
    bien_id: new FormControl('', Validators.required),
    alq_fecha: new FormControl('', Validators.required),
    alq_hora_inicio: new FormControl('', Validators.required),
    alq_hora_fin: new FormControl('', Validators.required),
    alq_total: new FormControl('', Validators.required),

  });


  ngOnInit(): void {
    this.showAllAlquileres()
    this.showAllCondominos()
    this.showAllBienes()
  }



  showAllAlquileres() {
    this.aquilerServices.getAllAlquiler().subscribe(
      (alquileres: any) => {
        this.alquileres = alquileres

      },
      (error) => console.log(error)
    );
  }

  showAllCondominos() {
    this.residenteService.getAllCondomino().subscribe(
      (condominos: any) => {
        this.condominos = condominos
        console.log(condominos)

      },
      (error) => console.log(error)
    );
  }

  showAllBienes() {
    this.bienService.getAllBien().subscribe(
      (bienes: any) => {
        this.bienes = bienes
        console.log(bienes)

      },
      (error) => console.log(error)
    );
  }
  createAlquiler(form: any) {
    if (this.formAlquiler.valid) {
      this.aquilerServices.postCreateAlquiler(form).subscribe((data: any) => {
        if (data.status == "Error") {
          this.showModalMore('center', 'info', data.resp, false, 2000);
        } else {
          this.showModalMore('center', 'success', data.resp, false, 2000);
          this.showAllAlquileres();
          this.formAlquiler.reset();
        }
      })
    } else {
      this.ShowModal('', 'Algún campo se encuentra vació', 'error');

    }

  }
  selectedOptionA: string = ""
  selectedOptionB: string = ""

  ShowModal(title: any, infor: any, tipo: any) {
    Swal.fire(title, infor, tipo);
  }
  showModalMore(position: any, icon: any, title: any, showConfirmButton: any, timer: any) {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: showConfirmButton,
      timer: timer
    });
  }

  getDataAlquiler(alq_id: any) {


  }
  updateAlquiler(form: any) {
    this.aquilerServices.putUpdateAlquiler(form).subscribe((data: any) => {
      if (data.status == "Error") {
        this.showModalMore('center', 'info', data.resp, false, 2000);
      } else {
        this.showModalMore('center', 'success', data.resp, false, 2000);
        this.showAllAlquileres();
      }
    })

  }
  deleteAlquiler(alq_id: any) {
    this.aquilerServices.deleteAlquiler(alq_id).subscribe((data: any) => {
      if (data.status == "Error") {
        this.showModalMore('center', 'info', data.resp, false, 2000);
      } else {
        this.showModalMore('center', 'success', data.resp, false, 2000);
        this.showAllAlquileres();
      }
    })

  }
}
