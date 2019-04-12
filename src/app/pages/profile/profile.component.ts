import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/services.index';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;

  imagenTemp: any;

  constructor(private usuaarioService: UsuarioService) {
    this.usuario = this.usuaarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    // si el usuario no es de google actualizalo
    if ( !this.usuario.google) {
      this.usuario.email =  usuario.email;
    }

    this.usuaarioService.updateUsuario(this.usuario).subscribe( resp => {
      console.log('respuesta', resp);
      Swal.fire('Usuario actualizado', '¡Correctamente!', 'success' );
    });
  }

  selecionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir =  null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      // swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      Swal.fire('Solo Imagenes', 'El archivo no coincida', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () =>  this.imagenTemp = reader.result;
      /// imprime el resultado en base 64
        // console.log(reader.result);
        // this.imagenTemp = reader.result;

    // si la imagen existe
    this.imagenSubir = archivo;
    console.log(archivo);
  }

  cambiarImagen() {
    this.usuaarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
