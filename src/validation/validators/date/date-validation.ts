import { InvalidDateFieldError } from "@/validation/errors";
import {
  FieldValidation,
  fieldValidationType,
} from "@/validation/protocols/field-validation";
import moment from "moment";

export class ValidDateValidation implements FieldValidation {
  constructor(readonly field: fieldValidationType) {}
  validate(value: any): Error | null {
    let date = moment(value);
    return date.isValid() || !value
      ? null
      : new InvalidDateFieldError(this.field.fieldLabel);
  }
}
