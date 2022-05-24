import { Identifier } from './Identifier';

interface Composed {
  [key: string]: Identifier<any>;
}

export class ComposedIdentifier<T extends Composed> extends Identifier<T> {
  public compose(): Record<keyof T, any> {
    return Object.entries(this.toValue()).reduce((acc, [key, value]) => {
      acc[key as keyof T] = value.toValue();

      return acc;
    }, {} as Record<keyof T, any>);
  }

  public override toString(): string {
    return Object.entries(this.compose())
      .map(([key, value]) => `${key}_${value}`)
      .join(';');
  }
}
