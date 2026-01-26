import { NgModule } from '@angular/core';
import { CoursesRoutingModule } from '../courses/courses-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  imports: [
    BrowserModule,
    CoursesRoutingModule,
    SharedModule,
  ]
})
export class CourseModule { }
