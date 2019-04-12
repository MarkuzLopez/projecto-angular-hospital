import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  tipo: string;
  id: string;
  oculto: string = 'oculto';

  notificacion =  new EventEmitter<any>();

  constructor() {
    console.log('modal listo servicio');
   }

   ocultarModal() {
     this.oculto = 'oculto';
     this.tipo = null;
     this.id = null;

   }

   mosstrarModal(tipo: string, id: string) {
     this.oculto = '';
     this.id = id;
     this.tipo = tipo;
   }
}
