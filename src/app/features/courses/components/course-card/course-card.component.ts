import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../../../models/course-model';
import { faFile, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;

  lesson = faFile;
  clock = faClock;

  constructor() { }

  ngOnInit(): void {
  }

}
