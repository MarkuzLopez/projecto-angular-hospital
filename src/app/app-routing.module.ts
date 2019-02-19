import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent },
      {path: 'progress', component: ProgressComponent },
      {path: 'graficas1', component: Graficas1Component },
      {path: '', redirectTo: '/dashboard', pathMatch: 'full' }
      /// * TODOs cuando no existe ninguna ruta, mandarlos a dasboard */
    ]
  },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: '**', component: NoPageFoundComponent  }  // * cuando no esta definida la ruta, mandarlos a Pagina No Encontrada * //
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true} )],
  // ? el {useHash: true}, sirve para redireccionar automaticamente hacia el principal *
  exports: [RouterModule]
})
export class AppRoutingModule { }
