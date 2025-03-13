import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { NeregistrovaniService } from '../services/neregistrovani.service';
import { Firma } from '../model/firma';
import { VlasnikServiceService } from '../services/vlasnik-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private userService: UserService, private router: Router, private neregistrovaniService: NeregistrovaniService, private vlasnikService: VlasnikServiceService) {}

  username: string;
  password: string;
  message: string;
  user: User = new User();
  baste: any[] = []
  vlasnici: User[] = []
  dekoratori: User[] = []
  jedanDan: number;
  sedamDana: number;
  tridesetDana: number;
  firme: Firma[] = [];
  ime: string = "";
  adresa: string = "";
  sortColumn: string = '';
  sortOrder: string = 'asc';

  ngOnInit(): void{
    this.neregistrovaniService.brojDekorisanihBasti().subscribe(data=>{
        console.log(data)
        this.baste = data
    })

    this.neregistrovaniService.brojVlasnika().subscribe(data=>{
        console.log(data)
        this.vlasnici = data
    })

    this.neregistrovaniService.brojDekoratora().subscribe(data=>{
        console.log(data)
        this.dekoratori = data
    })

    this.neregistrovaniService.dohvatiPosloveZa24Sata().subscribe((data : number)=>{
        console.log(data)
        this.jedanDan = data
    })

    this.neregistrovaniService.dohvatiPosloveZa7Dana().subscribe((data : number)=>{
        console.log(data)
        this.sedamDana = data
    })

    this.neregistrovaniService.dohvatiPosloveZa30Dana().subscribe((data : number)=>{
        console.log(data)
        this.tridesetDana = data;
    })

    this.neregistrovaniService.dohvatiFirme().subscribe(data=>{
        console.log(data)
        this.firme = data;
    })
    

  }

  login() {
    this.userService.login(this.username, this.password).subscribe((userFromDB) => {
        if (userFromDB != null) {
            if (userFromDB['message'] == "Admin can not log in through this form.") {
                this.message = "Admin can not log in through this form.";
            } else if (userFromDB['message'] == "Error") {
                this.message = "Pogresno uneti podaci.";
            } else if (userFromDB['message'] == "Vlasnik account is not active.") {
                this.message = "Vlasnik account is not active.";
            } else if (userFromDB.tip == "Vlasnik") {
                this.user = userFromDB;
                localStorage.setItem('ulogovan', this.user.username);
                this.router.navigate(['prvaStavkaVlasnik']);
            } else {
                this.user = userFromDB;
                localStorage.setItem('ulogovan', this.user.username);
                this.router.navigate(['prvaStavkaDekorator']);
            }
        } else {
            this.message = "Lose uneti podaci ili korisnik ne postoji u sistemu.";
        }

        
    });

    
}

pretraziFirme(){
    this.vlasnikService.pretraziFirme(this.ime, this.adresa).subscribe(firme=>{
      //console.log(this.adresa)
      this.firme = firme;
    })
  }

  sortFirme(column: string): void {
    if (this.sortColumn == column) {
      this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
    }
    this.sortColumn = column;

    this.firme.sort((a, b) => {
      let compareA = a[column] ? a[column].toString().toLowerCase() : '';
      let compareB = b[column] ? b[column].toString().toLowerCase() : '';

      if (compareA < compareB) return this.sortOrder == 'asc' ? -1 : 1;
      if (compareA > compareB) return this.sortOrder == 'asc' ? 1 : -1;
      return 0;
    });
  }

}
