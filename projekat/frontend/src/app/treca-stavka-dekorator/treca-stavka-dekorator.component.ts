import { Component } from '@angular/core';
import { VlasnikServiceService } from '../services/vlasnik-service.service';
import { User } from '../model/user';
import { RestoranskaBasta } from '../model/restoranskaBasta';
import { PrivatnaBasta } from '../model/privatnaBasta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treca-stavka-dekorator',
  templateUrl: './treca-stavka-dekorator.component.html',
  styleUrls: ['./treca-stavka-dekorator.component.css']
})
export class TrecaStavkaDekoratorComponent {

  constructor(private vlasnikService: VlasnikServiceService, private router: Router){}

  vlasnik: User = new User();
  restoranskeBaste: any[] = []
  privatneBaste: any[] = []
  message: string;
  tekst: string
  poruka: string


  ngOnInit() : void{

    this.vlasnikService.dohvatiVlasnika(localStorage.getItem('ulogovan')).subscribe(data=>{

      if(data){
        this.vlasnik = data;
        console.log(this.vlasnik)
      }

      this.vlasnikService.dohvatiPrivatnaOdrzavanja(this.vlasnik.imeFirme).subscribe(data=>{
        this.privatneBaste = data
      })

      this.vlasnikService.dohvatiRestoranskaOdrzavanja(this.vlasnik.imeFirme).subscribe(data=>{
        this.restoranskeBaste = data
      })

    })
    
  }

  

  prihvatiPrivatnaOdrzavanja(k){

    //this.vlasnik.imeFirme, datumZakazivanja, this.vlasnik.username
    this.vlasnikService.prihvatiPrivatnaOdrzavanja(this.vlasnik.imeFirme, k.datumZakazivanja, this.vlasnik.username, k.procenaZavrsetka).subscribe(k=>{})

    this.ngOnInit();

  }

  prihvatiRestoranskaOdrzavanja(k){

    this.vlasnikService.prihvatiRestoranskaOdrzavanja(this.vlasnik.imeFirme, k.datumZakazivanja, this.vlasnik.username, k.procenaZavrsetka).subscribe(k=>{})

    this.ngOnInit();


  }

  odbijPrivatnaOdrzavanja(k){

    this.vlasnikService.odbijPrivatnaOdrzavanja(this.vlasnik.imeFirme, k.datumZakazivanja, this.vlasnik.username).subscribe(k=>{})
    this.ngOnInit();



  }

  odbijRestoranskaOdrzavanja(k){

    this.vlasnikService.odbijRestoranskaOdrzavanja(this.vlasnik.imeFirme, k.datumZakazivanja, this.vlasnik.username).subscribe(k=>{})

    this.ngOnInit();


  }

  odjavi(){
    localStorage.clear();
    this.router.navigate([''])
  }



}
