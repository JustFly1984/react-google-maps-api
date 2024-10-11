class CustomStorage {
  values: Record<string, string>;

  constructor() {
    this.values = {};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem(key: string, value: any): void {
    this.values[key] = value.toString();
  }

  getItem(key: string): string | null {
    return this.values[key] ?? null;
  }
}

export const storage = typeof window !== "undefined" && window.localStorage ? window.localStorage : new CustomStorage();
