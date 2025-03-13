import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OwnerComponent } from './owner/owner.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { AdminComponent } from './admin/admin.component';
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
import { CetvrtaStavkaDekoratorComponent } from './cetvrta-stavka-dekorator/cetvrta-stavka-dekorator.component';
import { TrecaStavkaDekoratorComponent } from './treca-stavka-dekorator/treca-stavka-dekorator.component';
import { DrugaStavkaDekoratorComponent } from './druga-stavka-dekorator/druga-stavka-dekorator.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "owner", component: OwnerComponent},
  {path: "decorator", component: DecoratorComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "promenaLozinke", component: PasswordChangeComponent},
  {path: "admin", component: AdminComponent},
  {path: "azurirajKorisnika", component: AzurirajKorisnikaComponent},
  {path: "zaposli", component: ZaposliComponent},
  {path: "prvaStavkaVlasnik", component: PrvaStavkaVlasnikComponent},
  {path: "drugaStavkaVlasnik", component: DrugaStavkaVlasnikComponent},
  {path: "trecaStavkaVlasnik", component: TrecaStavkaVlasnikComponent},
  {path: "cetvrtaStavkaVlasnik", component: CetvrtaStavkaVlasnikComponent},
  {path: "prvaStavkaDekorator", component: PrvaStavkaDekoratorComponent},
  {path: "drugaStavkaDekorator", component: DrugaStavkaDekoratorComponent},
  {path: "trecaStavkaDekorator", component: TrecaStavkaDekoratorComponent},
  {path: "cetvrtaStavkaDekorator", component: CetvrtaStavkaDekoratorComponent},
  {path: "detaljiFirme", component: DetaljiFirmeComponent}








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
