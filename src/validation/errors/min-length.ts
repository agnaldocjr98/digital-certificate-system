export class MinLengthError extends Error {
  constructor(
    private readonly fieldLabel: string,
    private readonly length: number
  ) {
    super(
      `O valor do campo ${fieldLabel} deve contém no mínimo ${length} caracteres!`
    );
    this.name = "MaxLengthErro";
  }
}
