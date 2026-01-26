import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], search: string = ''): any[] {
    if (!search.trim()) {
      return items;
    }

    return items.filter(item => {
      if (item.name) {
        return item.name.toLowerCase().includes(search.toLowerCase());
      } else if (item.username) {
        return item.username.toLowerCase().includes(search.toLowerCase());
      }
    })
  }

}
