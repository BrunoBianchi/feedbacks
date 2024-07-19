import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Form } from '../../interfaces/forms.interface';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FormBuilderComponent implements OnInit {
  constructor(private el: ElementRef) { }
  @Input() public form!: Form;
  public previousForm!: Form;
  public show: boolean = false;
  public previousComponent!: any;
  public previousValue!: string | null;
  editableContainer: HTMLElement | null = null;

  ngOnInit(): void {
    this.previousForm = this.form;
    this.show = true;
    this.editableContainer = this.el.nativeElement.querySelector('.form');

  }

  @Output() public changeForm = new EventEmitter<Form>();


  @HostListener('document:click', ['$event'])
  public documentClick(event: any): void {
    // Ignore clicks inside the editable container
    this.editableContainer = this.el.nativeElement.querySelector('.form');
    if (this.editableContainer && !this.editableContainer.contains(event.target)) {
      this.finishEditing();
      return;
    }

    // Ignore clicks on certain elements
    if (['div', 'ul', 'input', 'hr', 'section', 'textarea'].some(block => event.target.tagName.toLowerCase() === block)) return;

    // If the target is different from the previous component, switch to editing mode
    if (this.previousComponent !== event.target) {
      this.finishEditing(); // Save the previous component value
      this.startEditing(event.target); // Start editing the new target
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

      // Focus the new input field
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
    }
  }


  public change() {
    console.log("aaa")
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.form.form, event.previousIndex, event.currentIndex)
    if (event.previousIndex != event.currentIndex) {
      console.log("mudado")
    }

  }
}
