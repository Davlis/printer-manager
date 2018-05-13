import { FormGroup, FormArray } from '@angular/forms';

export function touchAll(
  formGroup: FormGroup | FormArray, func = 'markAsTouched', opts = { onlySelf: false }
): void {
  for (const c of Object.keys(formGroup.controls)) {
    const _c = formGroup.controls[c];
    if (_c instanceof FormGroup || _c instanceof FormArray) {
      touchAll(_c);
    } else {
      _c[func](opts);
    }
  }
}

export function populateForm(
  formGroup: FormGroup, values: any, exclude?: Array<string>
): void {
  for (const control of Object.keys(formGroup.controls)) {
    if (!exclude.includes(control)) {
      formGroup.get(control).setValue(values[control]);
    }
  }
}
