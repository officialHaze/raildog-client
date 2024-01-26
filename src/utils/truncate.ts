export default function truncateText(text: string) {
  const maxLen: number = 9;
  return text.length > maxLen ? text.substring(0, maxLen + 1) + "...." : text;
}
