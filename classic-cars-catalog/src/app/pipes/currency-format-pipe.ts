import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: string): string {
    // Convierte "$150,000 - $300,000" en formato más legible
    return value.replace(/\$/g, 'USD $').replace(/-/g, '→');
  }
}