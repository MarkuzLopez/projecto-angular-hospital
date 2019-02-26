import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/services.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document, public settingsTema: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);

    this.settingsTema.aplicarTema(tema);
    // const url = `assets/css/colors/${tema}.css`;
    // this._document.getElementById('tema').setAttribute('href', url );

    // this.settingsTema.ajustes.tema = tema;
    // this.settingsTema.ajustes.temaUrl = url;

    // this.settingsTema.guardarAjuster();
  }

  aplicarCheck(link: any) {

    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
        ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
 // codigo con banila script
    const tema =  this.settingsTema.ajustes.tema; // obtener el tema

    for (const ref of selectores) {
      // recorrer el arreglo de html con la clase selector
      if (ref.getAttribute('data-theme') === tema ) {
        // si la propiedad de la clase selector data-theme === defaul, green, red, etc...
        ref.classList.add('working');
      }
    }
  }

}
