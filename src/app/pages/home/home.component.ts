import { Component } from '@angular/core';
import { ConfettiService } from '../../shared/services/confetti.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public confettiService: ConfettiService) {

  }
}
