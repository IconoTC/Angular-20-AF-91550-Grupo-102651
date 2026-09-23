import { Component, computed, inject, signal } from '@angular/core';
import { Counter } from '../counter/counter';
import { TimeService } from '../../../../core/services/time';

export interface CounterState {
  id: number;
  value: number;
  clicks: number;
}

const initialState: CounterState[] = [
  { id: 102, value: 1, clicks: 0 },
  { id: 105, value: 0, clicks: 0 },
  { id: 134, value: 0, clicks: 0 },
];

@Component({
  imports: [Counter],
  selector: 'ind-counters-list',
  styles: `
    div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
  `,
  template: `
    <h3>Counters</h3>
    <p>Total: {{ total() }}</p>
    <p>Total Clicks: {{ totalClicks() }}</p>
    <div>
      @for (counter of counters(); track counter.id) {
        <ind-counter [counter]="counter" (counterChange)="changeCounter($event)" />
      }
    </div>
    <div class="timeStamp">
      {{ timeService.getTime() }}
    </div>
  `,
})
export class CountersList {
  protected readonly timeService = inject(TimeService);

  protected readonly counters = signal<CounterState[]>(initialState);

  protected readonly total = computed(() => {
    return this.counters().reduce((acc, counter) => acc + counter.value, 0);
  });
  protected readonly totalClicks = computed(() => {
    return this.counters().reduce((acc, counter) => acc + counter.clicks, 0);
  });

  protected changeCounter(counter: CounterState) {
    console.log(counter);
    this.counters.update((counters) => {
      const index = counters.findIndex((c) => c.id === counter.id);
      if (index !== -1) {
        counters[index] = counter;
      }
      return [...counters];
    });
  }
}
