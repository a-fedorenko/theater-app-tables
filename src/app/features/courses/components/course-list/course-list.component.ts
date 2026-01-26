import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../../models/course-model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  searchingState$: Observable<boolean>;
  showButtonText: string = 'Show course';
  search: string;

  @Input() courses: Course[] | null;

  @Output() show: EventEmitter<Course> = new EventEmitter<Course>();


  constructor() { }

  ngOnInit(): void {
    //this.searchingState$ = this.coursesFacade.isSearchingState$;
  }

  showCourse(data: Course): void {
    this.show.emit(data);
  }

  filter(data: string): void {
    //this.coursesFacade.getFilteredCourses(data);
    // this.coursesFacade.courses$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     courses => this.courses = courses ?? []
    //   );
    // this.searchingState$ = this.coursesFacade.isSearchingState$;
  }

}
