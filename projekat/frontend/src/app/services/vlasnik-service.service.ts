import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Firma } from '../model/firma';
import { RestoranskaBasta } from '../model/restoranskaBasta';
import { PrivatnaBasta } from '../model/privatnaBasta';

@Injectable({
  providedIn: 'root'
})
export class VlasnikServiceService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/vlasnik';

  dohvatiVlasnika(username){
    const data =  {
      username: username
    }

    return this.http.post<User>(`${this.uri}/dohvatiVlasnika`, data);
  }

  pretraziFirme(ime, adresa){
    const data =  {
      ime: ime,
      adresa: adresa
    }

    return this.http.post<Firma[]>(`${this.uri}/pretraziFirme`, data);
  }

  dohvatiFirmu(nazivFirme){
    const data =  {
      ime: nazivFirme
    }

    return this.http.post<Firma>(`${this.uri}/dohvatiFirmu`, data);
  }

  validacijaZakazivanja(datum_vreme, nazivFirme){

    const data =  {
      nazivFirme: nazivFirme,
      datum_vreme: datum_vreme
    }

    return this.http.post(`${this.uri}/validacijaZakazivanja`, data);

  }

  dodajPrivatnuBastu(privatnaBasta, nazivFirme, ime){

    const data =  {
      ime: ime,
      nazivFirme : nazivFirme,
      privatnaBasta: privatnaBasta
    }

    return this.http.post(`${this.uri}/dodajPrivatnuBastu`, data);

  }

  dodajRestoranskuBastu(restoranskaBasta, nazivFirme, ime){

    const data =  {
      ime: ime,
      nazivFirme: nazivFirme,
      restoranskaBasta: restoranskaBasta
    }

    return this.http.post(`${this.uri}/dodajRestoranskuBastu`, data);

  }

  dohvatiZavrsenePoslovePrivatne(username){

    const data =  {
      username: username
    }

    return this.http.post<PrivatnaBasta[]>(`${this.uri}/dohvatiZavrsenePoslovePrivatne`, data);

  }

  dohvatiZavrsenePosloveRestoranske(username){

    const data =  {
      username: username
    }

    return this.http.post<RestoranskaBasta[]>(`${this.uri}/dohvatiZavrsenePosloveRestoranske`, data);

  }

  renovirajPrivatnu(username, datum_vreme){

    const data =  {
      username: username,
      datum_vreme: datum_vreme
    }

    return this.http.post(`${this.uri}/renovirajPrivatnu`, data);

  }

  renovirajRestoransku(username, datum_vreme){

    const data =  {
      username: username,
      datum_vreme: datum_vreme

    }

    return this.http.post(`${this.uri}/renovirajRestoransku`, data);

  }

  dohvatiPrivatneRenovirane(username){

    const data =  {
      username: username

    }

    return this.http.post<any[]>(`${this.uri}/dohvatiPrivatneRenovirane`, data);

  }

  dohvatiRestoranskeRenovirane(username){

    const data =  {
      username: username

    }

    return this.http.post<any[]>(`${this.uri}/dohvatiRestoranskeRenovirane`, data);

  }

  dohvatiRestoranskeNeobradjene(ime){

    const data =  {
      ime: ime

    }

    return this.http.post<any[]>(`${this.uri}/dohvatiRestoranskeNeobradjene`, data);

  }

  dohvatiPrivatneNeobradjene(ime){

    const data =  {
      ime: ime

    }

    return this.http.post<any[]>(`${this.uri}/dohvatiPrivatneNeobradjene`, data);

  }

  prihvatiPrivatne(username, datum_vreme, kor_ime){

    const data =  {
      username: username,
      datum_vreme: datum_vreme,
      kor_ime:kor_ime

    }

    return this.http.post(`${this.uri}/prihvatiPrivatne`, data);

  }

  prihvatiRestoranske(username, datum_vreme, kor_ime){

    const data =  {
      username: username,
      datum_vreme: datum_vreme,
      kor_ime:kor_ime

    }

    return this.http.post(`${this.uri}/prihvatiRestoranske`, data);

  }

  odbijPrivatne(username, datum_vreme, tekst){

    const data =  {
      username: username,
      datum_vreme: datum_vreme,
      tekst:tekst

    }

    return this.http.post(`${this.uri}/odbijPrivatne`, data);

  }

  odbijRestoranske(username, datum_vreme,tekst){

    const data =  {
      username: username,
      datum_vreme: datum_vreme,
      tekst:tekst

    }

    return this.http.post(`${this.uri}/odbijRestoranske`, data);

  }

  dohvatiPrivatnaOdrzavanja(ime_firme){

    const data =  {
      ime_firme: ime_firme

    }

    return this.http.post<any[]>(`${this.uri}/dohvatiPrivatnaOdrzavanja`, data);

  }

  dohvatiRestoranskaOdrzavanja(ime_firme){
    const data =  {
      ime_firme: ime_firme

    }

    return this.http.post<any[]>(`${this.uri}/dohvatiRestoranskaOdrzavanja`, data);
  }

  prihvatiPrivatnaOdrzavanja(username, datum_vreme, kor_ime, procenaZavrsetka){

    const data =  {
      username: username,
      datum_vreme: datum_vreme,
      kor_ime:kor_ime,
      procenaZavrsetka:procenaZavrsetka

    }

    return this.http.post(`${this.uri}/prihvatiPrivatnaOdrzavanja`, data);

  }

  prihvatiRestoranskaOdrzavanja(username, datum_vreme, kor_ime, procenaZavrsetka){

    const data =  {
      username: username,
      datum_vreme: datum_vreme,
      kor_ime:kor_ime,
      procenaZavrsetka:procenaZavrsetka

    }

    return this.http.post(`${this.uri}/prihvatiRestoranskaOdrzavanja`, data);

  }

  odbijPrivatnaOdrzavanja(username, datum_vreme, tekst){

    const data =  {
      username: username,
      datum_vreme: datum_vreme,
      tekst:tekst

    }

    return this.http.post(`${this.uri}/odbijPrivatnaOdrzavanja`, data);

  }

  odbijRestoranskaOdrzavanja(username, datum_vreme,tekst){

    const data =  {
      username: username,
      datum_vreme: datum_vreme,
      tekst:tekst

    }

    return this.http.post(`${this.uri}/odbijRestoranskaOdrzavanja`, data);

  }

  dohvatiPosaoPoMesecima(username, ime_firme){
    const data =  {
      username: username,
      ime_firme:ime_firme

    }

    return this.http.post<any>(`${this.uri}/dohvatiPosaoPoMesecima`, data);
  }

  dohvatiRaspodeluPoslova(ime_firme){
    const data =  {
      ime_firme : ime_firme

    }
    console.log(ime_firme)

    return this.http.post<any>(`${this.uri}/dohvatiRaspodeluPoslova`, data);
  }

  dohvatiDane(ime_firme){
    const data =  {
      ime_firme : ime_firme

    }
    console.log(ime_firme)

    return this.http.post<any>(`${this.uri}/dohvatiDane`, data);
  }
  
}
