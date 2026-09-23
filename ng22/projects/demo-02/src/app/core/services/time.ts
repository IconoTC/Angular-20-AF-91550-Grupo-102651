import { Service } from '@angular/core';

@Service()
export class TimeService {
  #date: Date = new Date();

  getTime() {
    return this.#date.getTime();
  }
}
