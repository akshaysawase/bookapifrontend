import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], text: string): any[] {
    if(!array) return [];
    if(!text) return array;
    text = text.toLowerCase();
    return array.filter((e1)=>{
      return e1.name.toLowerCase().includes(text)
    });
  }

}
