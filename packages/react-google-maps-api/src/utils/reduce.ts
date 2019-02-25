export const reduce = (obj: any, fn: any, acc: any) =>
  Object.keys(obj).reduce((newAcc, key) => fn(newAcc, obj[key], key), acc)
