import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  constructor(private authService: AuthService, private router: Router) { }

  public signUp() {
    this.authService.signUp(this.registerForm.value).subscribe(data => {
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error)
    })
  }
}
