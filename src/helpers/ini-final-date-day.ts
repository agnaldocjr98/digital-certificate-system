import moment from "moment";

export function IniFinDateOfDay() {
  const iniDate = moment(`${moment().format("YYYY-MM-DDT00:00:00.00Z")}`)
    .add(3, "h")
    .toDate();

  const finDate = moment(`${moment().format("YYYY-MM-DDT23:59:00.00Z")}`)
    .add(3, "h")
    .toDate();

  return { iniDate, finDate };
}
