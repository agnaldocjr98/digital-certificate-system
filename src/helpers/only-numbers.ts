export function OnlyNumbers(value: string) {
  var numsStr = value.replace(/[^0-9]/g, "");
  return numsStr;
}
