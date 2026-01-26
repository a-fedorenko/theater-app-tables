import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): any {
    if (value/60 > 1 && value/60 < 10) {
      return `0${((Math.floor(value/60*100)/100+' hours')).split('.').join(':')}`;
    } else if (value/60 >= 10) {
      return ((Math.floor(value/60*100)/100+' hours')).split('.').join(':');
    } else if (value<60 && value>10) {
      return `00:${value} hour`;
    } else if (value<10) {
      return `00:0${value} hour`;
    }
    return `0${(Math.floor(value/60*100)/100+' hour').split('.').join(':')}`;
  }

}

