import { signal } from '@angular/core';
import { form, validateStandardSchema } from '@angular/forms/signals';
import { z } from 'zod';

const profileSchema = z.object({
  username: z.string().min(3, 'Minimum 3 characters')
});

export class TestForms {
  myModel = signal({ username: '' });
  myForm = form(this.myModel, (path) => {
    validateStandardSchema(path, profileSchema);
  });

  check() {
    const isTouched = this.myForm.username().touched();
    const hasErrors = this.myForm.username().errors().length > 0;
    const msg = this.myForm.username().errors()[0]?.message;
    console.log(isTouched, hasErrors, msg);
  }
}
