import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService, ModalUploadService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  // un arreglo de usuarios
  usuario: Usuario[] = [];
  desde: number = 0;
  total: number;
  cargando: boolean;
  constructor(private usuarioService: UsuarioService, public modalService: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.modalService.notificacion.subscribe( res =>  {
      // recargeu la pagina, para obtener la iomagen una vez que se guarde en la lista de usuarios
      console.log('usuario emitters',res);
      
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.total = resp.total;
      this.usuario = resp.usuarios;
      this.cargando = false;
    });
  }

  mostrarModal(id: string) {
    this.modalService.mosstrarModal('usuarios', id);
  }

  ActualizarRole(usuario: Usuario) {
   this.usuarioService.updateUsuario(usuario).subscribe(resp => {
    console.log(resp);
   });
  }

  cambiarDesde(valor: number) {
    console.log(valor);
    /// paginar =  0 + valor;
    let paginar = this.desde + valor;

    if (paginar >= this.total) {
      return;
    }

    if (paginar < 0) {
      return;
    }

    this.desde = this.desde + valor;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario(termino).subscribe((usuario: any) => {
      console.log(usuario);
      this.usuario = usuario;
      this.cargando = false;
    });
  }

  eliminarUsuario(id: string) {
    if (this.usuarioService.usuario._id === id) {
      // swal('No puedes eliminar, al usuario logueado', this.usuarioService.usuario.nombre, 'error');
      Swal.fire(
        'No puedes eliminar, usuario logueado!',
        this.usuarioService.usuario.nombre,
        'error'
      );
      return;
    }

    Swal.fire({
      title: '¿Estas Seguro, eliminar este registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.deleteUsuario(id).subscribe(resp => {     
          this.cargarUsuarios();
        });
        Swal.fire(
          'Usuario eliminado!',
          'correctamente',
          'success'
        );
      }
    });
  }
}
