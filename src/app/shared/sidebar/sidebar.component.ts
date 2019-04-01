import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebarService: SidebarService, public usuarioServ: UsuarioService) {

  }

  ngOnInit() {
  }

  cerrarSession() {
    this.usuarioServ.logOut();
  }

}
