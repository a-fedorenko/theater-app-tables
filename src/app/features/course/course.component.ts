import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course-model';
import { AsyncPipe, NgIf } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { courses } from '../../../../courses';

@Component({
  selector: 'app-course',
  standalone: true,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  imports: [ AsyncPipe, NgIf, SharedModule ]
})
export class CourseComponent implements OnInit {

  selectedCourse: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  private getCourse (): void {
    this.route.params.subscribe(param => {
      this.selectedCourse = {
        ...courses.find((course) => course.id === param['id']),
        url: `assets/images/courses/${param['id']}.png`
      };
    });
  }

}
