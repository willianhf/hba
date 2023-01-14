import { Cache } from './Cache';

export class InMemoryCache implements Cache {
  private readonly cache = new Map<string, any>();

  public constructor() {}

  public get<T>(key: string): T | null {
    const value = this.cache.get(key);
    if (value === undefined) {
      return null;
    }

    return this.cache.get(key) as T;
  }

  public getOr<T>(key: string, or: T): T {
    const value = this.get<T>(key);
    if (value === null) {
      return or;
    }

    return value;
  }

  public set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  public invalidate(pattern: string): void {
    this.cache.forEach((_, key) => {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    });
  }

  public clear(): void {
    this.cache.clear();
  }

  public has(pattern: string): boolean {
    let has = false;
    for (let [key] of this.cache) {
      if (key.includes(pattern)) {
        has = true;
        break;
      }
    }

    return has;
  }
}
