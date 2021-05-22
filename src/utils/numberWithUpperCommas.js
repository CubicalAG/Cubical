export default function numberWithUpperCommas(x) {
  let num = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) num = num.replace(pattern, "$1'$2");
  return num;
}
