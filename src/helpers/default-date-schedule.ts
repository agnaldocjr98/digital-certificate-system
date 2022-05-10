import moment from "moment";

export function DefaultDateSchedule() {
  const startDate = moment(
    `${moment().format("YYYY-MM-DDTHH")}:${moment()
      .format("mm")
      .substring(0, 1)}0:00.00`
  ).toDate();

  const finalDate = moment(startDate).add(1, "hours").toDate();
  return { startDate, finalDate };
}
