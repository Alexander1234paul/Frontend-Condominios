import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-condomino',
  templateUrl: './condomino.component.html',
  styleUrls: ['./condomino.component.css']
})
export class CondominoComponent implements OnInit {
  ngOnInit(): void {
    // this.activoA = true;
  }
  activoA: boolean | undefined;
  activoB: boolean | undefined;


  changeActiveA() {
    this.activoA = true;
    this.activoB = false;

  }
  changeActiveB() {
    this.activoA = false;
    this.activoB = true;

  }
}
