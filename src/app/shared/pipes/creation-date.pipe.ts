import { Pipe, PipeTransform } from '@angular/core';
import { StringJoinerPipe } from './string-joiner.pipe';

@Pipe({
  name: 'creationDate'
})
export class CreationDatePipe implements PipeTransform {

  transform(value: Date | string): string | null {
    if (!value) return null;
    let date = new Date(value).toLocaleDateString('en-GB');
    let myDate = new StringJoinerPipe().transform(date.split('/'), '.');
    return myDate;
  }

}
