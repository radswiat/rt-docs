export function objToArr(obj) {
  return Object.keys(obj).map((key) => { return obj[key]; });
}
