export const reduce = (obj, fn, acc) =>
  Object.keys(obj).reduce(
    (newAcc, key, keys) =>
      fn(newAcc, obj[key], key),
    acc
  )
