import config from '~/config';

interface FormattedError {
  hasError: true,
  name: string;
  title: string;
  description: string;
  originalName?: string;
  stackTrace?: string;
}

export class ApplicationError {
  constructor(
    public name: string,
    public title: string,
    public description: string,
    public originalName?: string,
    public stackTrace?: string
  ) {}

  public toPlainObject(): FormattedError {
    if (config.isProduction) {
      return {
        hasError: true,
        name: this.name,
        title: this.title,
        description: this.description,
      };
    }

    return {
      hasError: true,
      name: this.name,
      title: this.title,
      description: this.description,
      originalName: this.originalName,
      stackTrace: this.stackTrace,
    };
  }

  public static fromRaw(error: any): FormattedError {
    if (error instanceof ApplicationError) {
      return error.toPlainObject();
    }

    if (error instanceof Error) {
      return new this(
        error.name,
        error.name,
        error.message,
        error.name,
        error.stack
      ).toPlainObject();
    }

    return new UnexpectedError().toPlainObject();
  }
}

export class UnexpectedError extends ApplicationError {
  constructor(description?: string) {
    super('UnexpectedError', 'Unexpected error', description ?? 'An unexpected error occurred.');
  }
}