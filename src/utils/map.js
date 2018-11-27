export const map = (obj, fn) =>
  Object.keys(obj).map((key, index) => fn(obj[key], key, index))
