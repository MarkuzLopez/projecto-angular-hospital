import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {
  oculto: string;
  imagenSubir: File;

  imagenTemp: any;


  constructor(public modalService: ModalUploadService, public subirArchivoService: SubirArchivoService ) { }

  ngOnInit() {
  }

  cerrarModal() {
   this.imagenTemp =  null;
   this.imagenSubir = null;

   this.modalService.ocultarModal();
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

  }


  subirArchivo() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalService.tipo, this.modalService.id).
        then( res => {
          console.log(res);
          this.modalService.notificacion.emit(res);
          // this.modalService.ocultarModal();
          this.cerrarModal();
        }).catch(error => {
          console.error(error);
        });
  }



}
