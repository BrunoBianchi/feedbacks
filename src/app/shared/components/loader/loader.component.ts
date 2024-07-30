import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnChanges {
  @Input() public show: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    this.show = changes['show'].currentValue;
  }
}
