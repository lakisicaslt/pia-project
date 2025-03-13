import { Component } from '@angular/core';
import { VlasnikServiceService } from '../services/vlasnik-service.service';
import { PrivatnaBasta } from '../model/privatnaBasta';
import { RestoranskaBasta } from '../model/restoranskaBasta';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treca-stavka-vlasnik',
  templateUrl: './treca-stavka-vlasnik.component.html',
  styleUrls: ['./treca-stavka-vlasnik.component.css']
})
export class TrecaStavkaVlasnikComponent {

  constructor(private vlasnikService: VlasnikServiceService, private router: Router){}

  vlasnik: User = new User();
  nazivFirme: string = localStorage.getItem('nazivFirme')

  ngOnInit() : void{

    this.vlasnikService.dohvatiVlasnika(localStorage.getItem('ulogovan')).subscribe(data=>{

      if(data){
        this.vlasnik = data;
        console.log(this.vlasnik)
      }
    })

  }

  

  odjavi(){
    localStorage.clear();
    this.router.navigate([''])
  }


}
