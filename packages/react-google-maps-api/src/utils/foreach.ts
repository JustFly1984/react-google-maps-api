// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function forEach(obj: any, fn: any): any {
  Object.keys(obj).forEach((key) => {
    return fn(obj[key], key)
  })
}
