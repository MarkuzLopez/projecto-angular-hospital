import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';


const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  getHospitales(): Observable<any> {
    const url = `${URL_SERVICIOS}/hospital`;
    return this.http.get(url, httOptions);
  }

  getHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}`;
    console.log(url);
    return this.http.get(url, httOptions);
  }

  updateHospital(hospital: Hospital){ 
   // let url =  URL_SERVICIOS + '/hospital/' + hospital._id;
  // url += '?token=' + this.usuarioService.token;
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this.usuarioService.token}`;
    console.log(url);
    return this.http.put(url, hospital, httOptions);
  }

  createHospital(nombre: string) {
    // let url =  URL_SERVICIOS + '/hospital/';
    // url += '?token=' + this._usuarioService.token;
    const url = `${URL_SERVICIOS}/hospital/?token=${this.usuarioService.token}`;
    return this.http.post(url, {nombre}, httOptions)
  }

  deleteHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.usuarioService.token}`;
    return this.http.delete(url, httOptions);
  }

  buscarHospital(termino: string) { 
    //  let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    console.log(url);
    return this.http.get(url, httOptions);
  }

}
