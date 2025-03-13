import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VlasnikServiceService } from '../services/vlasnik-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-prva-stavka-dekorator',
  templateUrl: './prva-stavka-dekorator.component.html',
  styleUrls: ['./prva-stavka-dekorator.component.css']
})
export class PrvaStavkaDekoratorComponent {
  constructor(private router: Router, private vlasnikService: VlasnikServiceService){}

  user: User = new User();
  message: string;

  ngOnInit(): void{
    

    this.vlasnikService.dohvatiVlasnika(localStorage.getItem('ulogovan')).subscribe(data =>{
      if(!data){
        this.message = "Greska u dohvatanju Vlasnika!";
      }else{
        this.user = data;
      }
    })
    
  }

  

  azuriraj(username){
    localStorage.setItem('username', username)
    this.router.navigate(['/azurirajKorisnika'])
  }

  odjavi(){
    localStorage.clear();
    this.router.navigate([''])
  }

}
