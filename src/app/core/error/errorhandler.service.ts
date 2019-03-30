import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    const message = error.message ? error.message : error.toString();
    console.log('From Error Handler', message);
    throw error;
  }
}
