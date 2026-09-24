import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number): string {
    if (!value) return '';
    if (length <= 0) return value;
    if (value.length <= length) return value;
    const truncated = value.slice(0, length - 3);
    const lastSpaceIndex = truncated.lastIndexOf(' ', length - 3);
    return lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) + ' ...' : truncated + ' ...';
  }
}
