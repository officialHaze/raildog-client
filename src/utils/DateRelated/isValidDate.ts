import isValidNumericStr from "../isValidNumericStr";

export default function isValidDate(date: string): boolean {
  const rawDate = date.replaceAll("-", "");

  if (rawDate.length > 8 || !isValidNumericStr(rawDate)) return false;

  return true;
}
