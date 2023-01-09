import { GraphQLError } from 'graphql';

export class ApplicationError extends GraphQLError {
  public constructor(
    public code: string,
    public title: string,
    description: string,
    extensions?: Record<string, any>
  ) {
    super(description, { extensions: { ...extensions, title, code } });
  }

  public toPlainObject(): object {
    return {
      code: this.code,
      name: this.name,
      title: this.title,
      description: this.message,
      stackTrace: this.stack,
      extensions: this.extensions
    };
  }
}

export class UnexpectedError extends ApplicationError {
  public constructor(description?: string) {
    super('UNEXPECTED_ERROR', 'Unexpected error', description ?? 'An unexpected error occurred.');
  }
}

export class ValidationError extends ApplicationError {
  public constructor(message: string) {
    super('VALIDATION_ERROR', 'Validation error', message);
  }
}

interface ErrorFieldFormat {
  field?: string;
  message: string;
}

export class ValidationInputError extends ApplicationError {
  public constructor(fields: ErrorFieldFormat | ErrorFieldFormat[]) {
    const assertedFields = Array.isArray(fields) ? fields : [fields];
    super('VALIDATION_INPUT_ERROR', 'Validation input', 'The input provided was invalid.', { fields: assertedFields });
  }
}

export class EntityNotFoundError extends ApplicationError {
  public constructor(message?: string) {
    super('ENTITY_NOT_FOUND_ERROR', 'Entity not found', message ?? 'The requested entity was not found.');
  }
}

export class AuthenticationError extends ApplicationError {
  public constructor() {
    super('UNAUTHENTICATED', 'Authentication error', 'You must be logged in to perform this action..');
  }
}

export class ForbiddenError extends ApplicationError {
  public constructor(message?: string) {
    super('FORBIDDEN', 'Forbidden error', message ?? 'You must be an admin to perform this action.');
  }
}
