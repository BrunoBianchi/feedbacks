import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Form } from '../../interfaces/forms.interface';
import { DragAndDropService } from '../../services/drag-and-drop.service';
interface t_styles {
  type: string,
  query?: Array<string>,
  css: string
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FormBuilderComponent implements OnInit, OnChanges {
  constructor(private el: ElementRef, private ss: DragAndDropService) { }
  @Input() public form!: Form;
  @Input() public styles: any;
  @Output() public changeForm = new EventEmitter<Form>();
  public previousForm!: Form;
  public show: boolean = false;
  public previousComponent!: any;
  public previousValue!: string | null;
  editableContainer: HTMLElement | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['styles'] && !changes['styles'].isFirstChange()) {
      const styles = changes['styles'].currentValue;
      this.updateItemStyles(styles);
    }
  }

  public removeItem(component: any) {
    this.form.form = this.form.form.filter(c => c != component);
  }

  ngOnInit(): void {
    this.previousForm = this.form;
    this.show = true;
    this.editableContainer = this.el.nativeElement.querySelector('.form');
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: any): void {
    this.editableContainer = this.el.nativeElement.querySelector('.form');
    if (this.editableContainer && !this.editableContainer.contains(event.target)) {
      this.finishEditing();
      return;
    }

    if (['div', 'ul', 'input', 'hr', 'section', 'textarea'].some(block => event.target.tagName.toLowerCase() === block)) return;
    if (event.target.className.includes('editor')) return;
    if (this.previousComponent !== event.target) {
      this.finishEditing();
      this.startEditing(event.target);
    }
  }

  @HostListener('document:keydown', ['$event'])
  public documentKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === 'Escape') {
      this.finishEditing();
    }
  }

  private startEditing(target: any): void {
    if (target && target.innerHTML.trim() !== '') {
      const value = target.innerHTML.trim();
      target.innerHTML = `<input class="input-editor" value="${value}" autofocus type='text'>`;
      this.previousComponent = target;
      this.previousValue = value;

      const input = target.querySelector(".input-editor");
      if (input) {
        input.focus();
      }
    }
  }

  private finishEditing(): void {
    if (this.previousComponent && this.el.nativeElement.querySelector(".input-editor")) {
      const input = this.el.nativeElement.querySelector(".input-editor");
      const newValue = input.value || this.previousValue;
      this.previousComponent.innerHTML = newValue;
      this.updateComponentInArray(this.previousComponent, newValue);
      this.previousComponent = null;
      this.previousValue = '';
    }
  }

  private updateComponentInArray(component: HTMLElement, newValue: string): void {
    const index = this.form.form.findIndex(x => x.includes(this.previousValue!));
    if (index !== -1) {
      this.form.form[index] = this.form.form[index].replace(this.previousValue!, newValue);
      this.changeForm.emit(this.form);
    }
  }

  private updateItemStyles(styles: Array<t_styles>): void {
    const items = this.el.nativeElement.querySelectorAll('.form-item');
    items.forEach((item: HTMLElement, index: number) => {
      styles.forEach((style: t_styles) => {
        if (style.query!.length >= 1 && style.query![0] != '') {
          const query: string = style.query?.join(',') || '';
          const elementsFromQuery = this.el.nativeElement.querySelectorAll(query);
          elementsFromQuery.forEach((el: any) => {
            el.style[style.type] = style.css;
          })
        } else {
          item.style[style.type as any] = style.css;
        }
      })

      this.form.form[index] = this.updateStylesInString(this.form.form[index], styles);
    });
    this.changeForm.emit(this.form);
  }


  private updateStylesInString(item: string, styles: Array<t_styles>): string {
    const div = document.createElement('div');
    div.innerHTML = item;
    const element = div.firstChild as HTMLElement;
    if (element) {
      styles.forEach((style: t_styles) => {
        if (style.query!.length >= 1 && style.query![0] != '') {
          const query: string = style.query?.join(',') || '';
          const elementsFromQuery = element.querySelectorAll(query);
          elementsFromQuery.forEach((el: any) => {
            el.style[style.type] = style.css;
          })
        } else {
          element.style[style.type as any] = style.css;
        }
      })
      return div.innerHTML;
    }
    return item;
  }


  drop(event: CdkDragDrop<string[]>): void {
    this.ss.drop(event)
  }
}
