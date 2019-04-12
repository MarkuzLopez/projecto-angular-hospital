import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/services.index';

import Swal from 'sweetalert2';

declare function init_plugins();

/// para obtener la variable e usuar google signin
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(private _router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();

    this.googleInit();

    // para guardar el correo cuando selecione la opcion de recuerdame, y el || ' para que no se valla undefided
    this.email = localStorage.getItem('email') || '';

    // para mantener l casilla de recuerdame palomeada
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }


  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '428762879892-iuajnj7vnksp6ket8nnrtgivo80ilpt7.apps.googleusercontent.com',
        cookiepolicy: 'single_host-origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      let profile = googleUser.getBasicProfile();
      console.log(profile);

      let token = googleUser.getAuthResponse().id_token;
      //console.log(token);

      this.usuarioService.logginGoogle(token).subscribe(resp => {
        console.log(resp);
        // this._router.navigate(['/dashboard']);
        window.location.href = '#dashboard';
      });

    });
  }

  ingresar(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);

    if (f.invalid) {
      return;
    }

    let usuario = new Usuario(null, f.value.email, f.value.password);

    this.usuarioService.accederLogin(usuario, this.recuerdame).subscribe(resp => {
      this._router.navigate(['/dashboard']);
    });

    //this._router.navigate(['/dashboard']);
  }

  hola() { 
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }

}
