export const compose = (...funcs) =>
  funcs.length === 0
    ? arg => arg
    : funcs.length === 1
      ? funcs[0]
      : funcs
        .reduce((a, b) =>
          (...args) =>
            a(b(...args)))
