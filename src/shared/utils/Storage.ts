export default class Storage {
  get(key: string): unknown {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
