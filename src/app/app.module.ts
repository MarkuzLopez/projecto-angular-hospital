import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// *  Rutas ///
import { APP_ROUTES } from './app-routing.module';

// ? Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { Graficas1Component } from './pages/graficas1/graficas1.component';
// import { ProgressComponent } from './pages/progress/progress.component';

// import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
// import { PagesComponent } from './pages/pages.component';

import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // DashboardComponent,
    // Graficas1Component,
    // ProgressComponent,
    // NoPageFoundComponent,
    // HeaderComponent,
    // SidebarComponent,
    // BreadcrumbsComponent,
    // PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
