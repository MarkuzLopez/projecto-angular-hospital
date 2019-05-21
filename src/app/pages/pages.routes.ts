import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/services.index';
import { AdminGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';



const pagesRoutes: Routes = [
    // {
    //     path: '',
    //     component: PagesComponent,
    //     canActivate: [LoginGuardGuard],
    //     children: [

            {
              path: 'dashboard',
              component: DashboardComponent,
              canActivate: [VerificaTokenGuard],
              data: {titulo: 'Dashboard'}
            },
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
            {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'} },
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Ajustes del Tema'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
            {path: 'accountSettings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del Tema'}},
            {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda en General'}},
            {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil Usuario'}},

            /// mantenimientos
            {
              path: 'usuarios',
              component: UsuariosComponent,
              canActivate: [AdminGuard],
              data: {titulo: 'Mantenimiento Usuarios'}
            },
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento Hospital'}},
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medico :D '}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full' }
            /// * TODOs cuando no existe ninguna ruta, mandarlos a dasboard */
    //     ]
    // }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );


/// tienes unos ojos que conocen la verdadera soledad, ojos que saben que saben que la soledad es el peor dolor del mundo  ///
