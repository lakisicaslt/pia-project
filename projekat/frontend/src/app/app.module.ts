import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OwnerComponent } from './owner/owner.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { AdminComponent } from './admin/admin.component';
import {HttpClientModule} from '@angular/common/http';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { ZaposliComponent } from './zaposli/zaposli.component';
import { PrvaStavkaVlasnikComponent } from './prva-stavka-vlasnik/prva-stavka-vlasnik.component';
import { DrugaStavkaVlasnikComponent } from './druga-stavka-vlasnik/druga-stavka-vlasnik.component';
import { TrecaStavkaVlasnikComponent } from './treca-stavka-vlasnik/treca-stavka-vlasnik.component';
import { CetvrtaStavkaVlasnikComponent } from './cetvrta-stavka-vlasnik/cetvrta-stavka-vlasnik.component';
import { PrvaStavkaDekoratorComponent } from './prva-stavka-dekorator/prva-stavka-dekorator.component';
import { DetaljiFirmeComponent } from './detalji-firme/detalji-firme.component';
import { DrugaStavkaDekoratorComponent } from './druga-stavka-dekorator/druga-stavka-dekorator.component';
import { TrecaStavkaDekoratorComponent } from './treca-stavka-dekorator/treca-stavka-dekorator.component';
import { CetvrtaStavkaDekoratorComponent } from './cetvrta-stavka-dekorator/cetvrta-stavka-dekorator.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OwnerComponent,
    DecoratorComponent,
    AdminComponent,
    PasswordChangeComponent,
    AdminLoginComponent,
    AzurirajKorisnikaComponent,
    ZaposliComponent,
    PrvaStavkaVlasnikComponent,
    DrugaStavkaVlasnikComponent,
    TrecaStavkaVlasnikComponent,
    CetvrtaStavkaVlasnikComponent,
    PrvaStavkaDekoratorComponent,
    DetaljiFirmeComponent,
    DrugaStavkaDekoratorComponent,
    TrecaStavkaDekoratorComponent,
    CetvrtaStavkaDekoratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
