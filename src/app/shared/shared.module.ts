import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ...existing code...
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


// ...existing code...


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    FontAwesomeModule,
  ],
})
export class SharedModule { }
