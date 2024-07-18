import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsService } from '../../../shared/services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Form } from '../../../shared/interfaces/forms.interface';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrl: './integration.component.scss'
})
export class IntegrationComponent {
  constructor(private formService: FormsService, private router: ActivatedRoute) { }


  public form!: Form;
  async ngOnInit() {
    this.form = await firstValueFrom(this.formService.getFormById(this.router.snapshot.params['id']));
  }

  codeSnippet = '<script src="http://feedbacks.com/libs/form-widget.js" defer></script>';

  ngAfterViewInit() {
    Prism.highlightAll();
  }
  copyCode() {
    const codeElement = document.querySelector('pre code');
    const range = document.createRange();
    range.selectNode(codeElement!);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copy code command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    window.getSelection()?.removeAllRanges();
  }


}
