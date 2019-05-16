import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico[] = [];
  usuario: Usuario[] = [];

  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient) {
     this.activatedRoute.params.subscribe( params => {
        let termino = params['termino'];
        console.log(termino);
        this.busquedaGeneral(termino);
     });
  }

  ngOnInit() {
  }

  busquedaGeneral(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.medico = resp.medicos;
      this.usuario = resp.usuarios;
      console.log(this.usuario);
    });
  }

}
