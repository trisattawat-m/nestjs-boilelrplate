export abstract class BaseException extends Error {
  public readonly code: string;
  public readonly domain: string;
  public readonly statusCode: number;

  constructor(
    domain: string,
    code: string,
    message: string,
    statusCode: number,
  ) {
    super(message);
    this.name = new.target.name;
    this.domain = domain;
    this.code = code;
    this.statusCode = statusCode;
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, this.constructor);
  }
}
