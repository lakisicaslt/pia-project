import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor (private userService: UserService, private router: Router) {}

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.adminLogin(this.username, this.password).subscribe((userFromDB) => {
      if(userFromDB){
        if(userFromDB['message'] == "Decorators and owners can not log in through this form."){
          this.message = "Only admins can not log in through this form."
        }
        else if(userFromDB != null){
          this.router.navigate(['admin'])

        }
    }
      else{
        this.message = "Lose uneti podaci ili korisnik ne postoji u sistemu."
      }
    })
  }

}
