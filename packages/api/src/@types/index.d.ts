type Nullish = null | undefined;

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;

type RequiredExceptFor<T, TOptional extends keyof T> = Required<Omit<T, TOptional>> & Partial<Pick<T, TOptional>>;
