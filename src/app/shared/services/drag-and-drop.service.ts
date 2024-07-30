import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
function makeid(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
function addDataSetToFirstElement(htmlString: string): string {
  const id = makeid(10);
  return htmlString.replace(/<([a-z]+)([^>]*)>/i, `<$1$2 data-set="${id}">`);
}
@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  constructor() { }

  public drop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const moduleHtml = event.previousContainer.data[event.previousIndex].module;
      const updatedModuleHtml = addDataSetToFirstElement(moduleHtml);
      event.previousContainer.data[event.previousIndex].module = updatedModuleHtml;
      event.container.data.push(updatedModuleHtml);

    }
  }

}
