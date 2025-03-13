import { Component } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-zaposli',
  templateUrl: './zaposli.component.html',
  styleUrls: ['./zaposli.component.css']
})
export class ZaposliComponent {

  constructor(private router: Router, private userService: UserService, private adminService: AdminServiceService){}

  message: string;
  

  ngOnInit(): void{
    this.userService.getAllNotWorkingDecorators().subscribe(users=>{
      this.dekoratori = users;
    })

  }
  dekoratori: User[] = [];
  ime: string = localStorage.getItem('zaposli');


  zaposli(username){

    console.log(this.ime)
    console.log(username)

    this.adminService.zaposli(username, this.ime).subscribe(resp=>{
      this.message = "Zaposleni dodat!"
      this.ngOnInit();
    }

    )

    
    

  }

}
