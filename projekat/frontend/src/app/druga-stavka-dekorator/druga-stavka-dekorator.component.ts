import { Component } from '@angular/core';
import { VlasnikServiceService } from '../services/vlasnik-service.service';
import { User } from '../model/user';
import { RestoranskaBasta } from '../model/restoranskaBasta';
import { PrivatnaBasta } from '../model/privatnaBasta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-druga-stavka-dekorator',
  templateUrl: './druga-stavka-dekorator.component.html',
  styleUrls: ['./druga-stavka-dekorator.component.css']
})
export class DrugaStavkaDekoratorComponent {

  constructor(private vlasnikService: VlasnikServiceService, private router: Router){}

  vlasnik: User = new User();
  restoranskeBaste: RestoranskaBasta[] = []
  privatneBaste: PrivatnaBasta[] = []
  message: string;
  tekst: string
  poruka: string


  ngOnInit() : void{

    this.vlasnikService.dohvatiVlasnika(localStorage.getItem('ulogovan')).subscribe(data=>{

      if(data){
        this.vlasnik = data;
        console.log(this.vlasnik)
      }

      this.vlasnikService.dohvatiPrivatneNeobradjene(this.vlasnik.imeFirme).subscribe(data=>{
        this.privatneBaste = data;
      })
      this.vlasnikService.dohvatiRestoranskeNeobradjene(this.vlasnik.imeFirme).subscribe(data=>{
        this.restoranskeBaste = data;

        this.restoranskeBaste.sort((a,b)=> new Date(a.datumZakazivanja).getTime()-new Date(b.datumZakazivanja).getTime())
      })
    })

    this.poruka = ""


    
  }

  odjavi(){
    localStorage.clear();
    this.router.navigate([''])
  }

  prihvatiRestoranske(datumZakazivanja){

    this.vlasnikService.prihvatiRestoranske(this.vlasnik.imeFirme, datumZakazivanja, this.vlasnik.username).subscribe()
    this.ngOnInit()

  }

  prihvatiPrivatne(datumZakazivanja){

    this.vlasnikService.prihvatiPrivatne(this.vlasnik.imeFirme, datumZakazivanja, this.vlasnik.username).subscribe()
    this.ngOnInit()

  }

  odbijPrivatne(datumZakazivanja){

    if(!this.tekst ){
      
      this.poruka = "Niste uneli tekst!"
    }else{
      this.vlasnikService.odbijPrivatne(this.vlasnik.imeFirme, datumZakazivanja, this.tekst).subscribe()
      this.ngOnInit()
    }

    
  }

  odbijRestoranske(datumZakazivanja){

    if(!this.tekst ){
      
      this.poruka = "Niste uneli tekst!"
    }else{
      this.vlasnikService.odbijRestoranske(this.vlasnik.imeFirme, datumZakazivanja, this.tekst).subscribe()
      this.ngOnInit()
    }

    
  }

}
