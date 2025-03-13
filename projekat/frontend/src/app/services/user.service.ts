import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000/users';


  login(username, password){
    const data =  {
      username: username,
      password : password
    }

    return this.http.post<User>(`${this.uri}/login`, data);
  }

  registruj(ime, prezime, pol, adresa, kontakt_telefon, email_adresa, profilna_slika, broj_kreditne_kartice, username, password, tip){

    const data = {
    ime: ime,
    prezime: prezime,
    pol: pol,
    adresa: adresa,
    kontakt_telefon: kontakt_telefon,
    email_adresa: email_adresa,
    profilna_slika: profilna_slika,
    broj_kreditne_kartice: broj_kreditne_kartice,
    username: username,
    password: password,
    tip: tip
    }

    return this.http.post(`${this.uri}/register`, data)

  }

  promeniLozinku(username, oldPassword, newPassword, newPassword2){

    const data = {

      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
      newPassword2: newPassword2

    }
    return this.http.post(`${this.uri}/changePassword`, data)

  }

  adminLogin(username, password){
    const data =  {
      username: username,
      password : password
    }

    return this.http.post<User>(`${this.uri}/adminLogin`, data);
  }

  getAllOwners(){
    return this.http.get<User[]>(`${this.uri}/getAllOwners`);
  }
  getAllOwnersNotActive(){
    return this.http.get<User[]>(`${this.uri}/getAllOwnersNotActive`);
  }

  getAllDecorators(){
    return this.http.get<User[]>(`${this.uri}/getAllDecorators`);
  }

  getAllNotWorkingDecorators(){
    return this.http.get<User[]>(`${this.uri}/getAllNotWorkingDecorators`);
  }

  azurirajDohvati(username){
    const data =  {
      username: username
    }

    return this.http.post<User>(`${this.uri}/azurirajDohvati`, data);
  }

  azuriraj(ime, prezime, pol, adresa, kontakt_telefon, email_adresa, profilna_slika, broj_kreditne_kartice, username, password, tip){

    const data = {
    ime: ime,
    prezime: prezime,
    pol: pol,
    adresa: adresa,
    kontakt_telefon: kontakt_telefon,
    email_adresa: email_adresa,
    profilna_slika: profilna_slika,
    broj_kreditne_kartice: broj_kreditne_kartice,
    username: username,
    password: password,
    tip: tip
    }

    return this.http.post(`${this.uri}/azuriraj`, data)

  }


}
