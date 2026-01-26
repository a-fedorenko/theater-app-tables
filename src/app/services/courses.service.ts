import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course-model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  selectedCourse$ = new BehaviorSubject<Course | null>(null);

  constructor() { }

  // getAll(): Observable<{
  //   successful: boolean,
  //   result: Course[]
  // }> {
  //   return this.http.get<{
  //     successful: boolean,
  //     result: Course[]
  //   }>(`${this.configUrl}/courses/all`);
  // }

  // filterCourses(searchValue: string): Observable<{
  //   successful: boolean,
  //   result: Course[]
  // }> {
  //   return this.http.get<{
  //     successful: boolean,
  //     result: Course[]
  //   }>(`${this.configUrl}/courses/filter?title=${searchValue}`);
  // }

  // addCourse(course: Course): Observable<{
  //   successful: boolean,
  //   result: Course
  // }> {
  //   return this.http.post<{
  //     successful: boolean,
  //     result: Course
  //   }>(`${this.configUrl}/courses/add`, {
  //     title: course.title,
  //     description: course.description,
  //     duration: course.duration,
  //     authors: course.authors,
  //   });
  // }

  getCourse(): Observable<Course | null> {
    return this.selectedCourse$.asObservable();
  }

  selectCourse(course: Course): void {
    this.selectedCourse$.next(course);
  }

  // deleteCourse(id: string): Observable<{
  //   successful: boolean,
  //   result: string
  // }> {
  //   return this.http.delete<{
  //     successful: boolean,
  //     result: string
  //   }>(`${this.configUrl}/courses/${id}`);
  // }
}
