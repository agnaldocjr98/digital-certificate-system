import { FieldValidation } from "@/validation/protocols/field-validation";
import { RequiredFieldValidation } from "@/validation/validators";
import { EmailValidation } from "../email/email-validation";
import { MaxLengthValidation } from "../max-length/max-length-validation";
import { MinLengthValidation } from "../min-length/min-length-validation";
import { fieldValidationType } from "@/validation/protocols/field-validation";
import { ValidDateValidation } from "../date/date-validation";

export class ValidationBuild {
  private constructor(
    private readonly field: fieldValidationType,
    private readonly validations: FieldValidation[]
  ) {}

  static field(field: fieldValidationType): ValidationBuild {
    return new ValidationBuild(field, []);
  }

  required(): ValidationBuild {
    this.validations.push(new RequiredFieldValidation(this.field));
    return this;
  }

  email(): ValidationBuild {
    this.validations.push(new EmailValidation(this.field));
    return this;
  }

  min(minLength: number): ValidationBuild {
    this.validations.push(new MinLengthValidation(this.field, minLength));
    return this;
  }

  max(maxLength: number): ValidationBuild {
    this.validations.push(new MaxLengthValidation(this.field, maxLength));
    return this;
  }

  date(): ValidationBuild {
    this.validations.push(new ValidDateValidation(this.field));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
