export type fieldValidationType = {
  fieldName: string;
  fieldLabel: string;
};

export interface FieldValidation {
  field: fieldValidationType;
  validate(value: string): Error;
}
