export function FormatCPFCNPJ(value: string) {
  if (value.length > 11) {
    const cnpj = value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1 $2 $3/$4-$5"
    );
    return cnpj;
  } else {
    const badchars = /[^\d]/g;
    const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/;
    const cpf = new String(value).replace(badchars, "");
    return cpf.replace(mask, "$1.$2.$3-$4");
  }
}
