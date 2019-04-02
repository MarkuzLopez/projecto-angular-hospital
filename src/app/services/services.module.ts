import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
   SettingsService,
   SidebarService,
   SharedService,
   UsuarioService,
   SubirArchivoService
  } from './services.index';
import { LoginGuardGuard } from './guards/login-guard.guard';
import {  } from './subirArchivo/subir-archivo.service';

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})

export class ServicesModule { }
