import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform {

  transform(membersData, location): any {
    return membersData.filter(eachItem => {
      return (eachItem['location'].toLowerCase().includes(location.toLowerCase()))
    });
  }

}
