import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form } from '../../interfaces/forms.interface';
import { DragAndDropService } from '../../services/drag-and-drop.service';

@Component({
  selector: 'app-form-builder-modules',
  templateUrl: './form-builder-modules.component.html',
  styleUrls: ['./form-builder-modules.component.scss']
})

export class FormBuilderModulesComponent {
  constructor(private ss: DragAndDropService) { }

  @Output() public transItems = new EventEmitter<any>();
  @Input() public listData!: string[];
  @Input() public form!: Form;

  public modules_list = [
    {
      icon: `<i style='margin-right:5px;' class="fa-regular fa-message"></i>Input with Label`,
      module: `<input style='' type='text'  style='width:100%;'>`,

    },
    {
      icon: `<i style='margin-right:5px;' class="fa-solid fa-font"></i>Paragraph`,
      module: '<span style="display:inline-block">This is Your Paragraph</span>',
    },
    {
      icon: `<i style='margin-right:5px;' class="fa-regular fa-square-check"></i> Multiple choices`,
      module: `<input  type='checkbox'> <span>a</span>`
    }
  ];


}
