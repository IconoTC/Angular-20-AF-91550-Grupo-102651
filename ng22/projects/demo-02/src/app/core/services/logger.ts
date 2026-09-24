

import { Service, InjectionToken, inject } from '@angular/core';
import { ErrorLevel } from '../types/error-level';

export const ERROR_LEVEL = new InjectionToken<ErrorLevel>('ERROR_LEVEL');


@Service()
export class Logger {
   readonly #level: ErrorLevel = inject(ERROR_LEVEL, { optional: true }) ?? 4;

   constructor() {
    console.log(`Logger initialized with level: ${this.#level}`);
   }

   get level(): ErrorLevel {
    return this.#level;
  }

  public error(message: string): void {
    if (this.#level > 0) {
      console.error(message);
    }
  }

  public warn(message: string): void {
    if (this.#level > 1) {
      console.warn(message);
    }
  }

  public info(message: string): void {
    if (this.#level > 2) {
      console.info(message);
    }
  }

  public log(message: string): void {
    if (this.#level > 3) {
      console.log(message);
    }
  }
}
