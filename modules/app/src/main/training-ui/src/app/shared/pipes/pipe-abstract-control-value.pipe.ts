import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'formControlValue'
})
export class PipeAbstractControlValue implements PipeTransform {

  transform(formGroup: AbstractControl, key: string): string {
    return formGroup.get(key)?.value;
  }

}
