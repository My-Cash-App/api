export function declOfNum(
  number: number,
  titles: string[],
  returnString: boolean,
): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const title =
    titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  if (returnString) {
    return `${number} ${title}`;
  } else return title;
}
