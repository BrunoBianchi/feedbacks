import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.scss'
})
export class SidebarDashboardComponent {
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string | null = null;
  optionsVisible: boolean = false;

  toggleOptions(): void {
    this.optionsVisible = !this.optionsVisible;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.optionsVisible = false;
  }

  customButtonClick(event: Event): void {
    event.stopPropagation(); // Prevent closing the dropdown
    alert('Custom button clicked!');
  }
}
