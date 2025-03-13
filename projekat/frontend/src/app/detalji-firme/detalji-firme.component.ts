import { Component } from '@angular/core';
import { Firma } from '../model/firma';
import { VlasnikServiceService } from '../services/vlasnik-service.service';
import { Usluga } from '../model/usluga';
import { PrivatnaBasta } from '../model/privatnaBasta';
import { RestoranskaBasta } from '../model/restoranskaBasta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalji-firme',
  templateUrl: './detalji-firme.component.html',
  styleUrls: ['./detalji-firme.component.css']
})
export class DetaljiFirmeComponent {

  constructor(private vlasnikService: VlasnikServiceService, private router: Router){}

  firma: Firma;
  nazivFirme: string = localStorage.getItem('nazivFirme')
  message: string;
  datum_vreme: Date;
  kvadratura_baste: number;
  tip: string;
  currentStep: number = 1;
  kvadratura_bazen: number;
  kvadratura_zelenilo: number
  kvadratura_inventar: number
  kvadratura_fontana: number
  broj_inventar: number
  uslugaSelected: Usluga[] = [];
  poruka: string
  tekst: string
  ime : string = localStorage.getItem('ulogovan')

  ngOnInit(): void{
    this.dohvatiFirmu(this.nazivFirme)
  }

  dohvatiFirmu(nazivFirme){

    this.vlasnikService.dohvatiFirmu(nazivFirme).subscribe(data=>{
      if(!data){
        this.poruka = "Lose dohvacena firma!"

      }
      else{
        this.firma = data;
      }
    }
    )



  }
  
  nextStep() {
    if (this.tip == "privatna") {
      this.currentStep = 2;
    } else if (this.tip == "restoranska") {
      this.currentStep = 3;
    }
  }

  prevStep() {
    this.currentStep = 1
  }

  toggleUsluga(usluga: Usluga) {
    const index = this.uslugaSelected.indexOf(usluga);
    if (index === -1) {
      this.uslugaSelected.push(usluga); 
    } else {
      this.uslugaSelected.splice(index, 1); 
    }
  }

  isSelected(usluga: Usluga): boolean {
    return this.uslugaSelected.includes(usluga); 
  }

  onSubmit(){
    console.log('Izabrane usluge:', this.uslugaSelected);
    console.log(this.kvadratura_baste);
    console.log(this.kvadratura_bazen);
    console.log(this.ime);


    if(!this.datum_vreme || !this.kvadratura_baste){
        this.message = "Nisu uneti podaci sa prve ankete";
        return;
    }

    if (this.tip == "privatna") {
        if (!this.kvadratura_bazen || !this.kvadratura_inventar || !this.kvadratura_zelenilo) {
            this.message = "Nisu uneti podaci sa druge ankete!";
            return;
        }
        if (this.kvadratura_baste < this.kvadratura_bazen || this.kvadratura_baste < this.kvadratura_inventar || this.kvadratura_baste < this.kvadratura_zelenilo) {
            this.message = "Ukupna kvadratura bašte mora biti veća od kvadrature svakog pojedinacnog dela!";
            return;
        }
    } else if (this.tip == "restoranska") {
        if (!this.kvadratura_fontana || !this.broj_inventar || !this.kvadratura_zelenilo || this.uslugaSelected.length == 0) {
            this.message = "Nisu uneti podaci sa druge ankete!";
            return;
        }
        if (this.kvadratura_baste < this.kvadratura_fontana || this.kvadratura_baste < this.kvadratura_zelenilo) {
            this.message = "Ukupna kvadratura bašte mora biti veća od kvadrature svakog pojedinačnog dela!";
            return;
        }
    } else {
        this.message = "Tip bašte nije izabran!";
        return;
    }

    this.vlasnikService.validacijaZakazivanja(this.datum_vreme, this.nazivFirme).subscribe(data => {
        console.log('Response:', data);
        if (data['message'] == "Firma na godisnjem odmoru!") {
            this.message = "Firma na godisnjem odmoru!";
            return;
        } else if (data['message'] == "Error") {
            this.message = "Lose uneti podaci";
        } else if (data['message'] == "ok") {
            if (this.tip == "privatna") {
                let privatnaBasta = new PrivatnaBasta();
                privatnaBasta.datum_vreme = this.datum_vreme;
                privatnaBasta.kvadratura_baste = this.kvadratura_baste;
                privatnaBasta.kvadratura_bazen = this.kvadratura_bazen;
                privatnaBasta.kvadratura_zelenilo = this.kvadratura_zelenilo;
                privatnaBasta.kvadratura_inventar = this.kvadratura_inventar;
                privatnaBasta.datumZakazivanja = new Date();
                privatnaBasta.imeFirme = this.nazivFirme;

                this.vlasnikService.dodajPrivatnuBastu(privatnaBasta, this.nazivFirme, this.ime).subscribe(data => {
                    if (data['message'] == "ok") {
                        console.log(privatnaBasta);
                        this.message = "Dodata privatna basta!";
                    } else {
                        this.message = "Greška prilikom dodavanja privatne bašte!";
                    }
                });
            } else if (this.tip == "restoranska") {
                console.log("Ulazi u dodavanje restoranske bašte");

                let restoranskaBasta = new RestoranskaBasta();
                restoranskaBasta.datum_vreme = this.datum_vreme;
                restoranskaBasta.kvadratura_baste = this.kvadratura_baste;
                restoranskaBasta.kvadratura_fontana = this.kvadratura_fontana;
                restoranskaBasta.kvadratura_zelenilo = this.kvadratura_zelenilo;
                restoranskaBasta.broj_inventar = this.broj_inventar;
                restoranskaBasta.tekst = this.tekst;
                restoranskaBasta.usluge = this.uslugaSelected;
                restoranskaBasta.datumZakazivanja = new Date();
                restoranskaBasta.imeFirme = this.nazivFirme;

                this.vlasnikService.dodajRestoranskuBastu(restoranskaBasta, this.nazivFirme, this.ime).subscribe(data => {
                    if (data['message'] == "ok") {
                        console.log(restoranskaBasta);
                        this.message = "Dodata restoranska basta!";
                    } else {
                        this.message = "Greška prilikom dodavanja restoranske bašte!";
                    }
                });
            }
        }
    });
}

odjavi(){
  localStorage.clear();
  this.router.navigate([''])
}

}
