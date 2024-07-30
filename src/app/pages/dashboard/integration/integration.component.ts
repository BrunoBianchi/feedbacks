import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsService } from '../../../shared/services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Form } from '../../../shared/interfaces/forms.interface';
import * as Prism from 'prismjs';

function arraysHaveSameElements(arr1: string[], arr2: string[]): boolean {
  const allInSecond = arr1.every(item => arr2.includes(item));
  const allInFirst = arr2.every(item => arr1.includes(item));
  return arr1.length === arr2.length && allInFirst && allInSecond;
}

interface t_styles {
  type: string,
  query?: Array<string>,
  css: string
}

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent {
  constructor(private formService: FormsService, private router: ActivatedRoute) { }
  public show: boolean = false;
  public styles: Array<t_styles> = [
    {
      type: 'color',
      css: 'black',
      query: ['']
    },
    {
      type: 'background-color',
      css: '#eaeaeb',
      query: ['input', 'textarea']
    },
    {
      type: 'background-color',
      css: 'white',
      query: ['button']
    },
    {
      type: 'color',
      css: 'white',
      query: ['button']
    },
    {
      type: 'color',
      css: '#03c47a',
      query: ['input', 'textarea']
    },
  ];
  public form!: Form;

  async ngOnInit() {
    this.form = await firstValueFrom(this.formService.getFormById(this.router.snapshot.params['id']));
    this.show = true;
    console.log(this.form)

    this.applySavedStyles();
  }

  public transferItems(item: any) {
    console.log(item)
  }

  private applySavedStyles() {
    this.styles.forEach((style: t_styles) => {
      const patternString = `${style.type}:\\s*(#[0-9a-fA-F]{6}|rgb\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}\\))`;
      const regex = new RegExp(patternString);

      if (style.query!.length >= 1 && style.query![0] != '') {
        style.query!.forEach((query) => {
          const queryPattern = new RegExp(`<${query}[^>]*style="([^"]*)`);
          const element = this.form.form.find(el => el.includes(query));

          if (element) {
            const matchesQuery = element.match(queryPattern);

            if (matchesQuery) {
              // Filtra todos os matches do regex
              const allMatches = matchesQuery[1].match(new RegExp(patternString, 'g'));
              if (allMatches) {
                // Aplica o último match encontrado
                const lastMatch = allMatches[allMatches.length - 1].match(regex);
                if (lastMatch) {
                  this.styles[this.styles.findIndex(s => s === style)].css = lastMatch[1] || "";
                }
              }
            }
          }
        });
      } else {
        // Para o caso de não ter query específica, usa o primeiro encontrado
        const matches = this.form.form[0].match(regex);
        if (matches) {
          this.styles[this.styles.findIndex(s => s === style)].css = matches[1];
        }
      }
    });
  }



  public changeStyle(style: t_styles) {
    this.styles = [...this.styles.filter(styles =>
      (styles.type != style.type && arraysHaveSameElements(style.query || [''], styles.query || ['']) == true) ||
      (styles.type == style.type && arraysHaveSameElements(style.query || [''], styles.query || ['']) == false) ||
      (style.type != styles.type && !arraysHaveSameElements(style.query || [''], styles.query || ['']))
    ), style];
  }

  codeSnippet = '<script src="http://feedbacks.com/libs/form-widget.js" defer></script>';

  ngAfterViewInit() {
    Prism.highlightAll();
  }

  public async saveChanges() {
    console.log(this.form.form);
    await this.formService.updateForm(this.router.snapshot.params['id'], this.form).subscribe(console.log);
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
