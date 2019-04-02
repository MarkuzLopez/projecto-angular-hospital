import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuarios/xxxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {

      case 'usuarios':
        url += '/usuarios/' + img;
        break;

      case 'medicos':
        url += '/medicos/' + img;
        break;


      case 'hospital':
        url += '/hospitales/' + img;
        break;


      default:
        console.log('Tipo de imagen no existe, usuarios, medicos');
        url += '/usuarios/xxxx';

    }

    return url;
  }
  // transform(img: string, tipo: string = 'usuarios'): any {

  //   let url = URL_SERVICIOS + '/img';

  //   if ( !img) {
  //     url += '/usuarios/xxxx';
  //   }

  //   if (img.indexOf('https') >= 0) {
  //     return img;
  //   }

  //   switch ( tipo ) {

  //     case 'usuario':
  //      url += '/usuarios' + img;
  //      break;

  //     case 'medico':
  //       url += '/medicos' + img;
  //       break;

  //     case 'hospital':
  //      url += '/hospitales';
  //      break;

  //      default:
  //       console.log('no se encontro ninguna de las opciopnes ');
  //       url += '/usuarios/xxxx';
  //   }

  //   return  url;
  // }

}
