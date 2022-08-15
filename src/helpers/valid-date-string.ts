export function ValidDateString(date: Date) {
  return date === null
    ? ""
    : date.toString() === "InvalidDate"
    ? ""
    : date.toString();
}
