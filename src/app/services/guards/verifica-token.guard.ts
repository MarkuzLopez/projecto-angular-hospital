import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService) { }

  canActivate(): Promise<boolean> | boolean  {

    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    let expiro  = this.expirado(payload.exp);

    if (expiro ) {
      return false;
    }

    // console.log('se vencio token');
    return this.verificaToken(payload.exp);
  }

  verificaToken(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();
      // console.log(ahora);

      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));
      // console.log('token: ',tokenExp);
      // console.log('ahora: ',ahora);
      resolve(true);

      // if (tokenExp.getTime() > ahora.getTime() ) {
      //     console.log('Se vencion token');
      //     resolve(true);
      // } else  {
      //   this.usuarioService.renovarToken()
      //   .subscribe( () => {
      //     reject(false);
      //   });
      // }

    });
  }

  expirado(fechaExp: number) {

    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }

}
