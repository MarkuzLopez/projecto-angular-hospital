import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser'; 

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjusteStorage();
   }

  guardarAjuster() {
    console.log('Guardado en localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes) );
  }

  cargarAjusteStorage() {
    if (localStorage.getItem('ajustes') ) {
      this.ajustes =  JSON.parse(localStorage.getItem('ajustes'));
      console.log('Cargado en localStorage');
      this.aplicarTema(this.ajustes.tema);
    } else {
      console.log('usando valores por defecto');
    }
  }

  aplicarTema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjuster();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
