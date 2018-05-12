import {
  FormGroup,
  FormArray
} from '@angular/forms';

export {
  touchAll
};

function touchAll(formGroup: FormGroup | FormArray, func = 'markAsTouched', opts = { onlySelf: false }) {
  for (const c of Object.keys(formGroup.controls)) {
    const _c = formGroup.controls[c];
    if (_c instanceof FormGroup || _c instanceof FormArray) {
      touchAll(_c);
    } else {
      _c[func](opts);
    }
  }
}
