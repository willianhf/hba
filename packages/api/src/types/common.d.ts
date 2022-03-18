export type Nullish = null | undefined;

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;

export type RequiredExceptFor<T, TOptional extends keyof T> = Required<Omit<T, TOptional>> & Partial<Pick<T, TOptional>>;