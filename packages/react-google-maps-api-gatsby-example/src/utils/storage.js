class CustomStorage {
  constructor() {
    this.values = {}
  }

  setItem(key, value) {
    this.values[key] = value.toString()
  }

  getItem(key) {
    return this.values[key] || null
  }
}

export const storage =
  typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : new CustomStorage()
