import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() buttonText: string;
  @Input() iconName: any;
  @Input() btnClass: string;
  @Input() type: string;
  @Input() disabled: boolean = false;
  @Input() iconWrap: boolean = false;
  @Input() btnIcon: boolean = false;
  @Input() btnColor: string;

  constructor() { }
}
