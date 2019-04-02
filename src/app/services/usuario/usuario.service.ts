import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public _subirArchivoService: SubirArchivoService
     ) {
    console.log('servicio de usuario listo');
    this.cargarStorage();
  }

  estaLogueado() {

    return (this.token.length > 2) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }


  logginGoogle(token: string) {
    let id: any; let toke: any; let usuario;

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        id = resp.id;
        toke = resp.token;
        usuario = resp.usuario;
        this.guardarStorage(id, toke, usuario);
        return true;
      })
    );
  }


  logOut() {
    console.log('ok0');

    this.usuario = null;
    this.token = '';
    console.log('ok1');

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    // tslint:disable-next-line: no-unused-expression
    console.log('ok3');
    this.router.navigate(['/login']);
    // this.router.navigate[('/login')];
  }

  accederLogin(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
        // para que cuando recargue la pagina el usuario siga activo y no se lopgue otra vez
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        //  para convertir de tipo objeto a un string y poder almacenarlo
      })
    );
  }

  createUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp;
      })
    );
  }

  updateUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {

        let usuarioDB: Usuario = resp.usuario;

        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');

        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then( (resp: any) => {
            console.log(resp);
            this.usuario.img = resp.usuario.img;
            this.guardarStorage(id, this.token, this.usuario);

            swal('Imagen Actualizada', this.usuario.nombre, 'success');

          })
          .catch( error => {
            console.error(error);
          });
  }

}
