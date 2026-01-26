import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {

  @Input() labelText: string;
  @Input() color: string = '#704FE6';
  @Input() backgroundColor: string = '#E9E2FF';

  constructor() { }
}
