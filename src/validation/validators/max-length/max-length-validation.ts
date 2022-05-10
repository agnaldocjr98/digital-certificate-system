import { MaxLengthError } from "@/validation/errors";
import {
  FieldValidation,
  fieldValidationType,
} from "@/validation/protocols/field-validation";

export class MaxLengthValidation implements FieldValidation {
  constructor(readonly field: fieldValidationType, public maxLength: number) {}
  validate(value: string): Error {
    return value.length > this.maxLength
      ? new MaxLengthError(this.field.fieldLabel, this.maxLength)
      : null;
  }
}
