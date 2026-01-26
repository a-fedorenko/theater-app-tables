import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course-model';
import { courses } from '../../../../courses';
import { categories } from '../../../../categories';
import { comments, posts } from '../../../../comments';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  allCourses: Course[];
  categories: any[];
  comments: any[];
  posts: any[];
  selectedСourse: Course;
  arrowIcon = faArrowRight;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.categories = categories;
    this.comments = comments;
    this.posts = posts;
  }

  showCourse(course: Course): void {
    this.coursesService.selectCourse(course);
    this.router.navigate([`/courses/${course.id}`]);
  }

  private getCourses(): void {
    this.allCourses = [...courses].map((course) => ({
      ...course,
      creationDate: new Date(course.creationDate),
      duration: Number(course.duration),
      price: Number(course.price),
      lessons:  Number(course.lessons),
      students: Number(course.students),
      url: `assets/images/courses/${course.id}.png`
    }));
  }

  log(): void {
    //this.authFacade.logout();
  }
}
