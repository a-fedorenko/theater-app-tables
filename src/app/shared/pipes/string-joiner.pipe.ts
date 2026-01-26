import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringJoiner'
})
export class StringJoinerPipe implements PipeTransform {

  transform(value: string[], separator: string): string | null {
    if(!value) return null;
    return value.join(separator);
  }

}
