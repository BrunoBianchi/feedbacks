import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../../../server/dist/interfaces/User.interface';
import { FormsService } from '../../../shared/services/forms.service';
import { Observable } from 'rxjs';
import { Form } from '../../../shared/interfaces/forms.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private formService: FormsService) { }
  public user: User | null = this.authService.user;
  public forms: Observable<Form[]> = this.formService.forms;
  ngOnInit(): void {
    this.formService.forms.subscribe((data: any) => {
      console.log(data)
    })
  }
}
