export class InvalidDateFieldError extends Error {
  constructor(private fieldLabel: string) {
    super(`A data enviada em ${fieldLabel} é inválida`);
    this.name = "InvalidDateFieldError";
  }
}
