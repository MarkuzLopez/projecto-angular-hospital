import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {



    /// ejecutar a promesa
    this.contarTres().then(  (mensaje: any)  => {
      console.log('Termino correctamente  (then)', mensaje);
    }).catch( error => {
      console.log('Sucedio un error (cathc)', error);
    });
   }

  ngOnInit() {
  }

  /// * metodo de tipo Promesa la cual retorna un booleano 
  contarTres(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);

        if (contador === 3) {
          // * reject('Error desde el Reject'); // * cuando la promesa no se resuelve correctamente hay error
           resolve(true); // * cuando la promesa se cumple correctamente
           clearInterval(intervalo); // * limpia el intervalo una vez que se cumple la condicion y ya no aumenta el contador
        }

      }, 1000);

    });
  }

}
