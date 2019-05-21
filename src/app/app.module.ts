import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; /// * para el bind [(ngModel)], y formulario reactivos

// *  Rutas ///
import { APP_ROUTES } from './app-routing.module';

// ? Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// ? SERVICIOS ?
 // * import { SettingsService } from './services/settings.service';

/// TODO modulo de todos los servicios
import { ServicesModule } from './services/services.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule, 
    // tslint:disable-next-line: max-line-length
    // cuando se aplica el lazyload, la importracion del modulo mo se aplica ya que se realiza en uso en el app-routing.module.ts (loadChildren)
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
