export class RequiredFieldError extends Error {
  constructor(private fieldName: string) {
    super(`O campo ${fieldName} é obrigatório`);
    this.name = "RequiredFieldError";
  }
}
