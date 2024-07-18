import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private authSerivice: AuthService) { }
  public user: User | null = this.authSerivice.user;

  ngOnInit(): void {
    this.user = this.authSerivice.user;
  }
}
