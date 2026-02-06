import moment from "moment";

export function formatDate(date: Date) {
  const now = moment();
  const inputDate = moment(date);
  const hoursDifference = now.diff(inputDate, "hours");

  if (hoursDifference < 24) {
    return inputDate.fromNow();
  } else {
    return inputDate.format("h:mma DD MMM YYYY");
  }
}
