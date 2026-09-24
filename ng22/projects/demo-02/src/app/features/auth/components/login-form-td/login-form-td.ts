import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const loginFormInitial = {
  email: '',
  password: '',
  rememberMe: false,
};

@Component({
  imports: [FormsModule, JsonPipe],
  selector: 'ind-login-form-td',
  styles: `
   form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80vw;
      max-width: 400px;

      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &.checkbox {
          flex-direction: row;
          align-items: center;
        }
      }
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

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: var(--color-background);
      background-color: var(--color-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
        cursor: not-allowed;
      }
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }`,
  template: `<form #loginForm="ngForm" (ngSubmit)="submitForm(loginForm)">
     <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" name="email" ngModel email required />
      </label>
      @if (loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched) {
        <div class="error">
          @if (loginForm.controls['email']?.hasError('required')) {
            <p>El correo electrónico es obligatorio.</p>
          }
          @if (loginForm.controls['email']?.hasError('email')) {
            <p>Por favor, introduce una dirección de correo electrónico válida.</p>
          }
        </div>
      }
      <label class="form-control" for="password">
        <span>Password</span>
        <input
          type="password"
          id="password"
          name="password"
          ngModel
          required minlength="6"
        />
      </label>
      @if (loginForm.controls['password']?.invalid && loginForm.controls['password']?.touched) {
        <div class="error">
          @if (loginForm.controls['password']?.hasError('required')) {
            <p>La contraseña es obligatoria.</p>
          }
          @if (loginForm.controls['password']?.hasError('minlength')) {
            <p>La contraseña debe tener al menos 4 caracteres.</p>
          }
        </div>
      }

     <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" name="rememberMe" [ngModel]="false" />
        <span>Remember me</span>
      </label>
      <button type="submit" [disabled]="loginForm?.invalid ||isLoading()">Login</button>
      @if(isLoading()) {
        <p>Enviando datos de login</p>
      }
    </form>
    <pre>
      {{ loginForm?.value | json }}
    </pre> `,
})
export class LoginFormTd {
  protected readonly ngForm = viewChild('loginForm');
  readonly #auth = inject(Auth)
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  protected readonly isLoading = signal(false)

  constructor() {
    effect(() => {
      console.log('ngForm', this.ngForm());
    });
  }
  submitForm(ngForm: NgForm) {
    console.log('Form value:', ngForm.value);
    this.isLoading.set(true)

    this.#auth.login(ngForm.value, {}).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe((response) => {
      console.log('Response', response)
      this.isLoading.set(false);
      ngForm.resetForm(loginFormInitial);
      this.#router.navigate(['/home']);
    })

  }
}
