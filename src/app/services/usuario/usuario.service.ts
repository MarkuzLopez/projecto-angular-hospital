import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import Swal from 'sweetalert2';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
// tslint:disable-next-line: variable-name
    public _subirArchivoService: SubirArchivoService
     ) {
    this.cargarStorage();
  }

  estaLogueado() {

    return (this.token.length > 2) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }


  logginGoogl(token: string) {
    let id: any; let toke: any; let usuario;

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        id = resp.id;
        toke = resp.token;
        usuario = resp.usuario;
        this.guardarStorage(id, toke, usuario, resp.menu);
        return true;
      })
    );
  }

  logginGoogle(token: string) {
   const url = `${URL_SERVICIOS}/login/google`;
   return this.http.post(url, {token }, httpOptions).pipe(
     map((resp: any) => {
       this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
       return true;
     })
   );
  }


  logOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

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

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
        // para que cuando recargue la pagina el usuario siga activo y no se lopgue otra vez
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        //  para convertir de tipo objeto a un string y poder almacenarlo
      })).pipe(
        catchError( err => 
            of([
              console.log('HTTP Error', err.status),
              Swal.fire(
                'Error Login',
                err.error.mensaje,
                'error'
              )
            ])
          )
      );
  }

  createUsuari(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
       // swal('Usuario creado', usuario.email, 'success');
        return resp;
      })
    );
  }


  renovarToken() {
    // localhost:3000/login/renuevatoken?token=
    const url = `${URL_SERVICIOS}/login/renuevatoken?=${this.token}`;
    return this.http.get(url, httpOptions).pipe(
                map((resp: any) => {
                  this.token = resp.token;
                  localStorage.setItem('token', this.token);
                  return true;
                })).pipe(
                  catchError( error => 
                   of([
                      this.router.navigate(['/login']),
                      Swal.fire('Expiro su session', 'No fuen posible renovar su token', 'error')
                   ])
                  )
                );
  }

  createUsuario(usuario: Usuario) {
    const url =  `${URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario, httpOptions)
          .pipe(
            catchError( err =>
                of([
                  console.log('HTTP Error', err),
                  Swal.fire(
                    err.error.mensaje,
                    err.error.errors.message,
                    'error'
                  )
                ])
              )
          );
  }

  updateUsuario(usuario: Usuario) {
    // http://localhost:3000/usuario/5c9ea621e45132062d54ace2?token=
    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;
    return this.http.put(url, usuario, httpOptions).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          let usuarioBD: Usuario = resp.usuario;
          this.guardarStorage(usuarioBD._id, this.token, usuarioBD, this.menu);
        }
        Swal.fire('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    ).pipe(
      catchError( err =>
          of([
            console.log('HTTP Error', err),
            Swal.fire(
              err.error.mensaje,
              err.error.errors.message,
              'error'
            )
          ])
        )
    );
  }

  updateUsuari(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {

        let usuarioDB: Usuario = resp.usuario;

        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, resp.menu);
      //  swal('Usuario actualizado', usuario.nombre, 'success');

        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then( (resp: any) => {
            console.log(resp);
            this.usuario.img = resp.usuario.img;
            this.guardarStorage(id, this.token, this.usuario, this.menu);

         //   swal('Imagen Actualizada', this.usuario.nombre, 'success');

          })
          .catch( error => {
            console.error(error);
          });
  }

  cargarUsuario(desde: number) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  cargarUsuarios(desde: number): Observable<any> {
    const url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
    return this.http.get(url, httpOptions);
  }

  buscarUsuario(termino: string) {
    // localhost:3000/busqueda/coleccion/medicos/selm
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    console.log(url);

    return this.http.get(url).pipe(
      map((resp: any) => {
         return resp.usuarios;
      })
    );
  }

  deleteUsuario(id: string): Observable<any> {
      const url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
      return this.http.delete(url, httpOptions);
  }

  deleteUsuari(id: string) {
    // localhost:3000/usuario/5ca662fde45132062d54ace8?
    // token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVjOWVhNjIxZTQ1MTMyMDYyZDU0YWNlMiIsInBhc3N3b3JkIjoiOiApIiwiaW1nIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0yMXU1SUM2cFQ5Yy9BQUFBQUFBQUFBSS9BQUFBQUFBQUJORS9jY0tlWW9ZaWIyQS9zOTYtYy9waG90by5qcGciLCJlbWFpbCI6Im1hcmtpdG9zMDJsb3Bleml0b0BnbWFpbC5jb20iLCJub21icmUiOiJNYXJjbyBBbnRvbmlvIiwiX192IjowLCJnb29nbGUiOnRydWUsInJvbGUiOiJVU0VSX1JPTEUifSwiaWF0IjoxNTU0NDg4MTIzLCJleHAiOjE1NTQ1MDI1MjN9.WvOrfNzz-kDLoMsHs1rX8GR-Q1ZN4G0qj7f0fc_EhyA
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    console.log(url);
    return this.http.delete(url).pipe(
      map((resp: any) => {
       //   swal('Usuario eliminado correctamente', this.usuario.nombre , 'success');
          return resp;
      }) 
    );
  }

}
