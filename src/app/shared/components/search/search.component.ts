import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  template: `
    <div class="search-container">
      <img class="search-icon" [src]="icon || 'assets/icons/search-round.svg'" alt="Search" width="20" height="20">
      <input
        type="text"
        [placeholder]="placeholder || 'Пошук...'"
        class="search-input"
        [(ngModel)]="value"
        (ngModelChange)="valueChange.emit($event)"
      />
    </div>
  `,
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchComponent {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeholder = '';
  @Input() icon = '';
}
