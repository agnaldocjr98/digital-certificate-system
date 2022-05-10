import { MinLengthError } from "@/validation/errors";
import {
  FieldValidation,
  fieldValidationType,
} from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: fieldValidationType, public minLength: number) {}
  validate(value: string): Error {
    return value.length >= this.minLength
      ? null
      : new MinLengthError(this.field.fieldLabel, this.minLength);
  }
}
