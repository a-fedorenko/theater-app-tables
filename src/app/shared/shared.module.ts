import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  ButtonComponent,
  SearchComponent,
  CategoryComponent,
  CommentComponent,
  LabelComponent,
  PostComponent,
  FooterComponent
} from './components/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DurationPipe } from './pipes/duration.pipe';
import { CreationDatePipe } from './pipes/creation-date.pipe';
import { StringJoinerPipe } from './pipes/string-joiner.pipe';
import { EmailValidatorDirective } from './validators/email-validator.directive';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


const COMPONENTS: any[] = [
  HeaderComponent,
  ButtonComponent,
  SearchComponent,
  CategoryComponent,
  CommentComponent,
  LabelComponent,
  PostComponent,
  FooterComponent
];
const PIPES: any[] = [
  DurationPipe,
  CreationDatePipe,
  StringJoinerPipe,
  SearchFilterPipe
];


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    EmailValidatorDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
  ],
})
export class SharedModule { }
