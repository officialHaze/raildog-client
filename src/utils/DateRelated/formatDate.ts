export default function formatDate(date: string) {
  let rawDate = date.replaceAll("-", "");
  let formattedDate: string = date;

  if (rawDate.length > 2 && rawDate.length <= 4)
    formattedDate = rawDate.substring(0, 2) + "-" + rawDate.substring(2);
  else if (rawDate.length > 4 && rawDate.length <= 5)
    formattedDate =
      rawDate.substring(0, 2) + "-" + rawDate.substring(2, 4) + "-" + rawDate.substring(4);

  return formattedDate;
}
