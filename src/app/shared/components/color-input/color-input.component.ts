import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
interface t_styles {
  type: string,
  query?: Array<string>,
  css: string
}
@Component({
  selector: 'app-color-input',
  templateUrl: './color-input.component.html',
  styleUrl: './color-input.component.scss'
})
export class ColorInputComponent implements OnInit {
  @Output() public emitStyle: EventEmitter<t_styles> = new EventEmitter();
  @Input() public inputStyle!: t_styles;
  @Input() public inputType!: string;
  @Input() public inputQuery!: Array<string>;
  color: string = '#CCCCCC';

  @ViewChild('colorPicker')
  colorPicker!: ElementRef;

  ngOnInit(): void {
    this.color = this.inputStyle.css;
  }

  updateColor(event: any) {
    this.color = event.target.value;
    this.emitStyle.emit({ type: this.inputType, css: this.color, query: this.inputQuery });
  }

  triggerColorPicker() {
    this.colorPicker.nativeElement.click();
  }
}
