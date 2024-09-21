import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: false
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date | string): string {
   if(!value) return '';

    const date = new Date(value);
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() +1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;




  }
 private padZero(value: number):string {
   return value < 10 ? `0${value}` : `${value}`;
  }

}
