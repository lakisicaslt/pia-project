import { Component } from '@angular/core';
import { VlasnikServiceService } from '../services/vlasnik-service.service';
import { User } from '../model/user';
import { RestoranskaBasta } from '../model/restoranskaBasta';
import { PrivatnaBasta } from '../model/privatnaBasta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cetvrta-stavka-vlasnik',
  templateUrl: './cetvrta-stavka-vlasnik.component.html',
  styleUrls: ['./cetvrta-stavka-vlasnik.component.css']
})
export class CetvrtaStavkaVlasnikComponent {
new: any;

  constructor(private vlasnikService: VlasnikServiceService, private router: Router){}

  vlasnik: User = new User();
  restoranskeBaste: RestoranskaBasta[] = []
  privatneBaste: PrivatnaBasta[] = []
  message: string;
  privatniRenovirani: any[] = [];
  restoranskiRenovirani: RestoranskaBasta[] = [];

  ngOnInit() : void{

    this.vlasnikService.dohvatiVlasnika(localStorage.getItem('ulogovan')).subscribe(data=>{

      if(data){
        this.vlasnik = data;
      }

      this.vlasnikService.dohvatiZavrsenePoslovePrivatne(this.vlasnik.username).subscribe(k=>{
        this.privatneBaste = k;
        
      })
      this.vlasnikService.dohvatiZavrsenePosloveRestoranske(this.vlasnik.username).subscribe(k=>{
        this.restoranskeBaste = k
      })

      this.vlasnikService.dohvatiPrivatneRenovirane(this.vlasnik.username).subscribe(k=>{
        this.privatniRenovirani = k
      })

      this.vlasnikService.dohvatiRestoranskeRenovirane(this.vlasnik.username).subscribe(k=>{
        this.restoranskiRenovirani = k
      })


      
    })


    
  }

  prosloSest(date: any): boolean {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const diffInMs = currentDate.getTime() - inputDate.getTime();
    const sixMonthsInMs = 6 * 30 * 24 * 60 * 60 * 1000;
    return diffInMs > sixMonthsInMs;
  }

  renoviranjePrivatnu(datumZakazivanje: Date){

    let datumZakazivanja = datumZakazivanje.toString()
    console.log(datumZakazivanja)


    this.vlasnikService.renovirajPrivatnu(this.vlasnik.username, datumZakazivanja).subscribe(k=>{
      if (k['message'] == "Error") {
        this.message = "Error";

    }else{
      this.message = "Dodato na renoviranje!"
      this.ngOnInit();
    }
    })

  }
  renoviranjeRestoransku(datumZakazivanje: Date){

    let datumZakazivanja = datumZakazivanje.toString()


    this.vlasnikService.renovirajRestoransku(this.vlasnik.username, datumZakazivanja).subscribe(k=>{
      
      if (k['message'] == "Error") {
        this.message = "Error";

    }else{
      this.message = "Dodato na renoviranje!"
      this.ngOnInit();
    }

    })


  }

  odjavi(){
    localStorage.clear();
    this.router.navigate([''])
  }

}
