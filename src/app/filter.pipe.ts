import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(membersData, searchModifier): any {
    return membersData.filter(eachItem => {
      if (eachItem['name']) {
        return (eachItem['name'].toLowerCase().includes(searchModifier.toLowerCase()));
      }
    });
  }
}


