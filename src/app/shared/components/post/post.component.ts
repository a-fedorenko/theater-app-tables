import { Component, Input } from '@angular/core';
import { faComments, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: any;

  comment = faComments;
  calendar = faCalendarDays;

  constructor() { }
}
