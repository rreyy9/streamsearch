import { Pipe, PipeTransform } from '@angular/core';
import { Stream } from './models';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(datas: Stream[], searchValue: string): Stream[] {
    if (!datas || !searchValue){
      return datas;
    }
    return datas.filter(x => 
      x.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
  }

}
