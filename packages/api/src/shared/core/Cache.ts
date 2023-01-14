export interface Cache {
  get<T>(key: string): T | null;
  getOr<T>(key: string, or: T): T;
  set<T>(key: string, value: T): void;
  invalidate(pattern: string): void;
  clear(): void;
  has(pattern: string): boolean;
}