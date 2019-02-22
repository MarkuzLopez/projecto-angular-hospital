import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progreso1: number;
  progreso2: number;
  constructor() { }

  ngOnInit() {
    this.progreso1 = 20;
    this.progreso2 = 30;
  }

  actualizar(valor: number) {
    console.log(valor);
    this.progreso1 = valor;
  }

  // cambiarValor(valor) {
  //   if (this.progreso >= 100) {
  //     return;
  //   }
  //   if (this.progreso <= 0) {
  //     return;
  //   }

  //   this.progreso = this.progreso + valor;
  // }

}
