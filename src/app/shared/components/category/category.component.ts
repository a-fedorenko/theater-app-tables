import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @Input() categoryText: string;
  @Input() icon: string;
  @Input() color: string;

  constructor() { }
}
