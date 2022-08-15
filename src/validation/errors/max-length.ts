export class MaxLengthError extends Error {
  constructor(
    private readonly fieldaLabel: string,
    private readonly length: number
  ) {
    super(
      `O valor do campo ${fieldaLabel} deve conter no máximo ${length} caracteres!`
    );
    this.name = "MaxLengthErro";
  }
}
