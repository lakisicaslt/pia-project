import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firma } from '../model/firma';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/admin';

  dodajFirmu(ime_firme, adresa_firme, usluge, lokacija, kontakt_osoba, datum_pocetka, datum_kraja){

    const data = {
      ime: ime_firme,
      adresa: adresa_firme, 
      usluge: usluge, 
      lokacija: lokacija, 
      kontakt_osoba: kontakt_osoba,
      datum_pocetka: datum_pocetka,
      datum_kraja: datum_kraja
    }

    return this.http.post(`${this.uri}/dodajFirmu`, data);

  }

  dohvFirme(){

    return this.http.get<Firma[]>(`${this.uri}/dohvFirme`);
  }

  zaposli(username, ime){
    const data = {
      username: username,
      ime: ime
    }

    return this.http.post(`${this.uri}/zaposli`, data);
}


  prihvati(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/prihvati`, data);
  }

  odbij(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/odbij`, data);
  }

}
