import { Component, input, linkedSignal, output, signal } from '@angular/core';
import { Card } from '../../../../core/components/card/card';
import { CounterState } from '../counters-list/counters-list';

const LIMIT = 5;

@Component({
  imports: [Card],
  selector: 'ind-counter',
  styles: `
    .limit-reached {
      color: var(--color-primary);
      font-weight: bold;
      margin: 0.5rem 0;
    }
    .negative {
      color: red;
    }
  `,
  template: `
    <ind-card>
      <h3>Contador {{ counter().id }}</h3>
      <!-- <p>Valor: <output [class]="count() < 0 ? 'negative' : ''">{{ count() }} </output></p> -->
      <!-- <p>Valor: <output [class]="{negative: count() < 0}">{{ count() }} </output></p> -->
      <p>
        Valor: <output [class.negative]="count() < 0">{{ count() }} </output>
      </p>
      <p>
        Clicks: <output>{{ clicks() }}</output>
      </p>
      <div>
        <button (click)="changeCount(1)" [disabled]="count() >= limit()" title="Increment">
          ➕
        </button>
        <button (click)="changeCount(-1)" [disabled]="count() <= -limit()" title="Decrement">
          ➖
        </button>
        <button (click)="resetCount()" [disabled]="count() === 0 && clicks() === 0" title="Reset">
          🟣
        </button>
      </div>
      @if (count() >= limit()) {
        <p class="limit-reached">Alcanzaste el límite de {{ limit() }}</p>
      } @else if (count() <= -limit()) {
        <p class="limit-reached">Alcanzaste el límite de -{{ limit() }}</p>
      } @else {
        <p class="limit-reached">&nbsp;</p>
      }
    </ind-card>
  `,
})
export class Counter {
  
  
  readonly counter = input.required<CounterState>();
  readonly counterChange = output<CounterState>();

  // @Output() counterChange = new EventEmitter<CounterState>();


  protected readonly clicks = signal(0);
  //protected readonly count = signal(0);

  protected readonly count = linkedSignal(() => this.counter().value);

  protected readonly limit = signal(LIMIT);

  // constructor() {
  //   effect(() => this.count.set(this.value()));
  // }

  private emitEvent() {
    this.counterChange.emit({
      id: this.counter().id,
      value: this.count(),
      clicks: this.clicks(),
    });
  }

  protected changeCount(delta: number) {
    this.clicks.update((value) => value + 1);
    this.count.update((value) => value + delta);
    this.emitEvent();
  }

  protected resetCount() {
    this.count.set(0);
    this.clicks.set(0);
    this.emitEvent();
  }
}
