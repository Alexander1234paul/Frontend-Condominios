import { Component, OnInit } from '@angular/core';
import { AlquilerComponent } from '../alquiler/alquiler.component';
import { AlquilerService } from '../../servicios/alquiler/alquiler.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userLogeado: string = "";

  ngOnInit(): void {
    this.showUser();
  }
  constructor(private alquilerServices: AlquilerService) { }




  public showUser() {

    this.alquilerServices.getUser(localStorage.getItem('tokenAC')).subscribe((data: any) => {
          this.userLogeado = data.resp;
    });


    // console.log(this.cookieService.get('tokenIC'))
  }
}
