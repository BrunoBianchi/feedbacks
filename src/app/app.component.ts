import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
<router-outlet> 
<app-navbar/>

</router-outlet>`
})
export class AppComponent {
  title = 'feedbacks';
}
