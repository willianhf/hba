import { Nullish } from '~/types/common';

type ResultError<T> = T | string | Nullish;

export class Result<T> {
  public constructor(isSuccess: boolean, public error: ResultError<T>, private value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }

    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  public isSuccess(): this is { _value: T } {
    return !!this.value;
  }

  public isFailure(): this is { error: T | string } {
    return !!this.error;
  }

  public getValue(): T {
    if (this.isFailure()) {
      throw new Error(`Can't get the value of an error result. Use 'errorValue' instead.`);
    }

    return this.value as T;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public errorString(): string {
    return this.error as string;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (result.isFailure()) return result;
    }

    return Result.ok();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
