import { RequiredFieldError } from "@/validation/errors";
import {
  FieldValidation,
  fieldValidationType,
} from "@/validation/protocols/field-validation";

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: fieldValidationType) {}

  validate(value: string): Error {
    return value ? null : new RequiredFieldError(this.field.fieldLabel);
  }
}
