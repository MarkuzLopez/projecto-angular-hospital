import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    // this.regresarObservable().pipe(
    //   retry(2) /// de rxjs/operatros
    // )
    // .subscribe(
    //   numero => console.log('Subs', numero),
    //   error => console.error(error),
    //   () => console.log('El Observador termino!')

    // );

    this.subscription = this.regresarObservableMap()
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.log('error en el obs', error),
        () => console.log('El observador termino!')
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va ha s¡cerrar');
    this.subscription.unsubscribe();
  }

  regresarObservableMap(): Observable<any> {

    return new Observable((observable: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador++;

        const salida = {
          valor: contador
        };

        observable.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observable.complete();
        // }

      });
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          // impar
          console.log('impar', valor);
          return true;
        } else {
          // par
          console.log('par', valor);
          return false;
        }
      })
    );
  }

  // regresarObservable(): Observable<number> {

  //   return new Observable((observable: Subscriber<any>)  => {

  //     let contador = 0;

  //     let intervalo = setInterval(() => {

  //       contador += 1;

  //       observable.next(contador);

  //       if (contador === 3) {
  //         clearInterval(intervalo);
  //         observable.complete();
  //       }
  //       if ( contador === 2) {
  //        // clearInterval(intervalo);
  //         observable.error('Auxilio, callese Viejo Lesbiano!');
  //       }

  //     });

  //   });

  // }

}
