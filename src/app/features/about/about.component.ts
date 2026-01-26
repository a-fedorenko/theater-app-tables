import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course-model';
import { AsyncPipe, NgIf } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { courses } from '../../../../courses';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [ AsyncPipe, NgIf, SharedModule ]
})
export class AboutComponent implements OnInit {

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
