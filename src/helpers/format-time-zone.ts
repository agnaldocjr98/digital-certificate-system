import moment from "moment";

export function FormatTimeZoneIdentite(date: string, subHours: number = -3) {
  return `${moment(date).add(subHours, "h").format("YYYY-MM-DDTHH:mm")}:00Z`;
}
