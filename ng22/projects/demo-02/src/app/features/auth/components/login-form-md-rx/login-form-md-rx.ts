import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, JsonPipe],
  selector: 'ind-login-form-md-rx',
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
    }
  `,
  template: `
    <form [formGroup]="loginFormGroup" (ngSubmit)="onSubmit()">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" formControlName="email" />
      </label>
      @if (loginFormGroup.controls['email']?.invalid && loginFormGroup.controls['email']?.touched) {
        <div class="error">
          @if (loginFormGroup.get('email')?.hasError('required')) {
            <p>El correo electrónico es obligatorio.</p>
          }
          @if (loginFormGroup.get('email')?.hasError('email')) {
            <p>Por favor, introduce una dirección de correo electrónico válida.</p>
          }
        </div>
      }
      <label class="form-control" for="password">
        <span>Password</span>
        <input type="password" id="password" name="password" formControlName="password" />
      </label>
      @if (loginFormGroup.get('password')?.invalid && loginFormGroup.get('password')?.touched) {
        <div class="error">
          @if (loginFormGroup.get('password')?.hasError('required')) {
            <p>La contraseña es obligatoria.</p>
          }
          @if (loginFormGroup.get('password')?.hasError('minlength')) {
            <p>La contraseña debe tener al menos 4 caracteres.</p>
          }
        </div>
      }
      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" name="rememberMe" formControlName="rememberMe" />
        <span>Remember me</span>
      </label>
      <button type="submit" [disabled]="loginFormGroup.invalid">Login</button>
    </form>
    <pre>
      {{ loginFormGroup.value | json }}
    </pre>
  `,
})
export class LoginFormMdRx {
  readonly #fb = inject(FormBuilder);
  readonly #auth = inject(Auth)
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  protected readonly isLoading = signal(false);

  protected readonly loginFormGroup: FormGroup = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rememberMe: [false, []],
  });

  //   protected readonly formGroup = new FormGroup({
  //     email: new FormControl('', []),
  //     password: new FormControl('', []),
  //     rememberMe: new FormControl(false),
  //   });

  protected onSubmit(): void {
    if (this.loginFormGroup.valid) {
      this.isLoading.set(true);

      this.#auth
        .login(this.loginFormGroup.value, {})
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe((response) => {
          console.log('Response', response);
          this.isLoading.set(false);
          this.loginFormGroup.reset();
          this.#router.navigate(['/home']);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
