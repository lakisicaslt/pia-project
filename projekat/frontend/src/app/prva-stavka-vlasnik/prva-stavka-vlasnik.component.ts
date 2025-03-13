import { Component } from '@angular/core';
import { User } from '../model/user';
import { VlasnikServiceService } from '../services/vlasnik-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prva-stavka-vlasnik',
  templateUrl: './prva-stavka-vlasnik.component.html',
  styleUrls: ['./prva-stavka-vlasnik.component.css']
})
export class PrvaStavkaVlasnikComponent {

  constructor(private router: Router, private vlasnikService: VlasnikServiceService){}

  ngOnInit(): void{

    this.vlasnikService.dohvatiVlasnika(localStorage.getItem('ulogovan')).subscribe(data =>{
      if(!data){
        this.message = "Greska u dohvatanju Vlasnika!";
      }else{
        this.user = data;
      }
    })
    
  }

  user: User = new User();
  message: string;

  azuriraj(username){
    localStorage.setItem('username', username)
    this.router.navigate(['/azurirajKorisnika'])
  }

  odjavi(){
    localStorage.clear();
    this.router.navigate([''])
  }

}
