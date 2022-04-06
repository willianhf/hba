import { ApolloError } from 'apollo-server';

export class ApplicationError extends ApolloError {
  constructor(code: string, title: string, description: string, extensions?: Record<string, any>) {
    super(description, code, extensions);

    Object.defineProperty(this, 'name', { value: title });
  }
}

export class UnexpectedError extends ApplicationError {
  constructor(description?: string) {
    super('UNEXPECTED_ERROR', 'Unexpected error', description ?? 'An unexpected error occurred.');
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
  public constructor() {
    super('FORBIDDEN', 'Forbidden error', 'You must be an admin to perform this action.');
  }
}
