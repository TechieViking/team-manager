import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guard'
})
export class GuardPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
