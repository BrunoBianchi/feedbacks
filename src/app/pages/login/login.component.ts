import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private authService: AuthService, private router: Router) { }

  public signIn() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error)
    })
  }
}
