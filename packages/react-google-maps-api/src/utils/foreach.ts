export const forEach = (obj: any, fn: any): any => {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
