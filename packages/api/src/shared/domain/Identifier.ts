export class Identifier<T> {
  constructor(private readonly value: T) {}

  toString() {
    return String(this.value);
  }

  toValue(): T {
    return this.value;
  }

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.toValue() === this.value;
  }
}
