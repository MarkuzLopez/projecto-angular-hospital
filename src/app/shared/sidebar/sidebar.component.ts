import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/services.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(public _sidebarService: SidebarService, public usuarioServ: UsuarioService) {

  }

  ngOnInit() {
    this.usuario =  this.usuarioServ.usuario;
  }

  cerrarSession() {
    this.usuarioServ.logOut();
  }

}
