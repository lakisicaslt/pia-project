import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {

  constructor (private userService: UserService, private router: Router) {}

  username: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  message: string;

  changePassword(){
    this.userService.promeniLozinku(this.username, this.oldPassword, this.newPassword, this.newPassword2).subscribe(resp=>{
      if(resp['message'] == "Error saving password, new passwords do not match."){
        this.message = "Error saving password, new passwords do not match."
      }

      else if(resp['message'] == "Error saving change."){
        this.message = "Error saving change."
      }
      
      else if(resp['message'] == "Password changed."){
        this.router.navigate([''])
      }
      else if(resp['message'] == "Error saving password, old password do not match or username not found."){
        this.message = "Error saving password, old password do not match or username not found."
      }
      else if(resp['message'] == "Password does not meet complexity requirements"){
        this.message = "Password does not meet complexity requirements"
      }
      else{
        this.message = "Error"
      }
    })
  }

}
