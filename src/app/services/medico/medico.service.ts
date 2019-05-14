import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';


const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application(json'})
}

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient, public serviceUsuario: UsuarioService) { }

  getMedicos() { 
    // localhost:3000/medicos
    const url = `${URL_SERVICIOS}/medicos`;
    return this.http.get(url, httpOptions);
  }

  getMedico(id: string) {
    // localhost:3000/medicos/5cd9bb6da85b8c0296a3e35a
    const url = `${URL_SERVICIOS}/medicos/${id}`;
    console.log(url);
    return this.http.get(url, httpOptions);
  }

  //
// tslint:disable-next-line: max-line-length
  // localhost:3000/medicos?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVjOWVhNjIxZTQ1MTMyMDYyZDU0YWNlMiIsInBhc3N3b3JkIjoiOiApIiwiaW1nIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0yMXU1SUM2cFQ5Yy9BQUFBQUFBQUFBSS9BQUFBQUFBQUJORS9jY0tlWW9ZaWIyQS9zOTYtYy9waG90by5qcGciLCJlbWFpbCI6Im1hcmtpdG9zMDJsb3Bleml0b0BnbWFpbC5jb20iLCJub21icmUiOiJNYXJjbyBBbnRvbmlvIiwiX192IjowLCJnb29nbGUiOnRydWUsInJvbGUiOiJBRE1JTl9ST0xFIn0sImlhdCI6MTU1NjU3NDM0MCwiZXhwIjoxNTU2NTg4NzQwfQ.TNIVSn0IIHWk11pealoOWI4wO7M-lfNnphSrzgPbbTo
  // saveMedicos(medico: Medico) {
  //   const url = `${URL_SERVICIOS}/medicos?token=${this.serviceUsuario.token}`;
  //   console.log(url);
  //   return this.http.post(url, medico, httpOptions);
  // }
  saveMedicos(medico: Medico) {

    let url = URL_SERVICIOS + '/medicos';

    if (medico._id) {
      ///// actualizando medico
      url += '/' + medico._id;
      url += '?token=' + this.serviceUsuario.token;

      return this.http.put(url, medico)
        .pipe(
          map((resp: any) => {
            return resp.medico;
          })
        )
    } else {
      /// creando medico nuevo 
      url += '?token=' + this.serviceUsuario.token;

      return this.http.post(url, medico)
        .pipe(
          map((resp: any) => {
            return resp.medico;
          })
        );
    }
  }

  deleteMedico(id: string) {
    const url = `${URL_SERVICIOS}/medicos/${id}?token=${this.serviceUsuario.token}`;
    console.log(url);
    return this.http.delete(url, httpOptions);
  }

  searchMedico(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url, httpOptions);
  }

}
