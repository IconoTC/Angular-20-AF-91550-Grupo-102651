import { Component, computed, input, model } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'ind-input',
  styles: `
    .form-control {
      padding-block-start: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    input,
    textarea {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }

    span {
      font-size: 0.8rem;
      color: var(--color-primary);
      margin-bottom: 0.2rem;
      position: relative;
      top: -2rem;
    }

    input:focus-visible + span,
    input:not(:placeholder-shown) + span {
      color: var(--color-primary-hot);
      top: -4rem;
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
  template: `
    <label for="{{ id() }}" class="form-control">
      <input
        type="{{ type() }}"
        id="{{ id() }}"
        placeholder=" "
        [value]="value()"
        (input)="value.set($event.target.value)"
        (blur)="touched.set(true)"
      />
      <span>{{ label() }}</span>
    </label>
    @if (invalid() && touched()) {
      <p class="error">
        {{ errors()?.[0]?.message }}
      </p>
    }
  `,
})
export class Input implements FormValueControl<string> {
  value = model<string>('');

  readonly touched = model<boolean>(false);
  readonly invalid = input.required<boolean>();
  readonly errors = input.required<readonly ValidationError[]>();

  readonly type = input<string>('text');
  readonly label = input.required<string>();
  readonly id = computed<string>(() => this.#generateId());

  #generateId() {
    return `${this.type()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}
