import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Firma } from '../model/firma';

@Injectable({
  providedIn: 'root'
})
export class NeregistrovaniService {

    constructor(private http: HttpClient) { }
  
    uri = 'http://localhost:4000/neregistrovani';



    brojDekorisanihBasti(){
  
      return this.http.get<any[]>(`${this.uri}/brojDekorisanihBasti`);
    }

    brojVlasnika(){
  
      return this.http.get<User[]>(`${this.uri}/brojVlasnika`);
    }

    brojDekoratora(){
  
      return this.http.get<User[]>(`${this.uri}/brojDekoratora`);
    }

    dohvatiPosloveZa24Sata(){
  
      return this.http.get<number>(`${this.uri}/dohvatiPosloveZa24Sata`);
    }

    dohvatiPosloveZa7Dana(){
  
      return this.http.get<number>(`${this.uri}/dohvatiPosloveZa7Dana`);
    }

    dohvatiPosloveZa30Dana(){
  
      return this.http.get<number>(`${this.uri}/dohvatiPosloveZa30Dana`);
    }

    dohvatiFirme(){
  
      return this.http.get<Firma[]>(`${this.uri}/dohvatiFirme`);
    }


}



