import { InvalidEmailError } from "@/validation/errors";
import { FieldValidation, fieldValidationType } from "@/validation/protocols/field-validation";


export class EmailValidation implements FieldValidation {
  constructor(readonly field: fieldValidationType) {}
  validate(value: string): Error {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !value || regex.test(value) ? null : new InvalidEmailError();
  }
}
