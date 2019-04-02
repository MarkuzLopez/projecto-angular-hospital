import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {
     /// todo esto es vanilla script
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('imagen almacenada');
            // convertirlo a JSON, ya que la respuesta la retorna como string
            // resolve(xhr.response);
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }

      };

      /// aqui se incerta el servicio para la carga de iomg, del back-end
      // TODO localhost:3000/upload/ /5b5b2f815be50b2482363c08
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });

  }
}
