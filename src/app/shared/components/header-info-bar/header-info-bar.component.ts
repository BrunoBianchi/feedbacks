import { Component, Input } from '@angular/core';
import { Form } from '../../interfaces/forms.interface';
import { FormsService } from '../../services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-header-info-bar',
  templateUrl: './header-info-bar.component.html',
  styleUrl: './header-info-bar.component.scss'
})
export class HeaderInfoBarComponent {
  constructor(private formService: FormsService, private router: ActivatedRoute) { }


  public form!: Form;
  async ngOnInit() {
    this.form = await firstValueFrom(this.formService.getFormById(this.router.snapshot.params['id']));
  }
}
