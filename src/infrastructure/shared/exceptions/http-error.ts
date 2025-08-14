import { BaseException } from './base.exception';

export class BadRequestError extends BaseException {
  constructor(domain: string, code: string, message: string) {
    super(domain, code, message, 400);
  }
}

export class UnauthorizedError extends BaseException {
  constructor(domain: string, code: string, message: string) {
    super(domain, code, message, 401);
  }
}

export class ForbiddenError extends BaseException {
  constructor(domain: string, code: string, message: string) {
    super(domain, code, message, 403);
  }
}

export class NotFoundError extends BaseException {
  constructor(domain: string, code: string, message: string) {
    super(domain, code, message, 404);
  }
}

export class InternalError extends BaseException {
  constructor(domain: string, code: string, message: string) {
    super(domain, code, message, 500);
  }
}
