import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: '**', component: NoPageFoundComponent  }  // * cuando no esta definida la ruta, mandarlos a Pagina No Encontrada * //
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );

