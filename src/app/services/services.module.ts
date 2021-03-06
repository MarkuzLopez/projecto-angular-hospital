import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
   SettingsService,
   SidebarService,
   SharedService,
   UsuarioService,
   SubirArchivoService,
   ModalUploadService,
   HospitalesService,
   MedicoService,
   AdminGuard,
   VerificaTokenGuard
  } from './services.index';
import { LoginGuardGuard } from './guards/login-guard.guard';


@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalesService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})

export class ServicesModule { }
