export default function isValidNumericStr(str: string) {
  const numberOnlyRegex = new RegExp("^[0-9]+$");

  return str ? numberOnlyRegex.test(str) : true;
}
