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
    super('VALIDATION_INPUT_ERROR', 'ValidationInputError', 'Invalid input provided.', { fields: assertedFields });
  }
}
