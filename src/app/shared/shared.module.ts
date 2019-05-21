import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; /// * directivas, ngFor, ngIf, NgStyle etc..
import { PipesModule } from '../pipes/pipes.module';
import { ModalImgComponent } from '../componentes/modal-img/modal-img.component';

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      PipesModule
    ],
    declarations: [
     BreadcrumbsComponent,
     HeaderComponent,
     NoPageFoundComponent,
     SidebarComponent,
     ModalImgComponent
    ],
    exports: [
      BreadcrumbsComponent,
      HeaderComponent,
      NoPageFoundComponent,
      SidebarComponent,
      ModalImgComponent
    ]
})

export class SharedModule { }
