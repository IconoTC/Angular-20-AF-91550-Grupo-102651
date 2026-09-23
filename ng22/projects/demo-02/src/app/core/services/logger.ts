

import { Service, InjectionToken, inject } from '@angular/core';
import { ErrorLevel } from '../types/error-level';

export const ERROR_LEVEL = new InjectionToken<ErrorLevel>('ERROR_LEVEL');


@Service()
export class Logger {
   readonly #level: ErrorLevel = inject(ERROR_LEVEL, { optional: true }) ?? 4;

   constructor() {
    console.log(`Logger initialized with level: ${this.#level}`);
   }
}
