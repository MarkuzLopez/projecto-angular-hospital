import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
   SettingsService,
   SidebarService,
   SharedService
  } from './services.index';

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService
  ],
  imports: [
    CommonModule
  ]
})

export class ServicesModule { }
