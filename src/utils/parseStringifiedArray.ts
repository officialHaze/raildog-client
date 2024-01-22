const isLastItem = (arr: any[], currentIdx: number) => arr.length - 1 === currentIdx;

export default function parseStringifiedArray(arrStr: string): any[] {
  const splits = arrStr.split("},");
  console.log("Stringified Array Splits: ", splits);

  const result = splits.map((str, i) => {
    let modifiedStr = str
      .replace(/'/g, "")
      .replace(/\[/g, "")
      .replace(/\n/g, "")
      .replace(/ /g, "")
      .replace(/\]/g, "");
    modifiedStr = isLastItem(splits, i) ? modifiedStr : modifiedStr + "}";
    return JSON.parse(modifiedStr);
  });
  console.log("Parsed result: ", result);

  return [];
}
