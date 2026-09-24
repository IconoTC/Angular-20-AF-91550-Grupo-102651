import { Component, inject, signal } from '@angular/core';
import { LoginRequest } from '../../types/auth';
import {
  email,
  FieldTree,
  form,
  FormField,
  FormRoot,
  minLength,
  PathKind,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { Input } from '../../../../core/design/input/input';

type LoginModel = LoginRequest;

// export interface LoginRequest {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// }

@Component({
  imports: [FormField, FormRoot, JsonPipe, Input],
  selector: 'ind-login-form-signals',
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
    <form [formRoot]="loginFieldTree">
      <!-- <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" [formField]="loginFieldTree.email" />
      </label>
      @if (loginFieldTree.email()?.invalid() && loginFieldTree.email()?.touched()) {
        <p class="error">{{ loginFieldTree.email().errors()[0].message }}</p>
      } -->
        <ind-input
          [formField]="loginFieldTree.email"
          [label]="'Email'"
          [type]="'email'"
        />
        <!-- <label class="form-control" for="password">
          <span>Password</span>
          <input type="password" id="password" [formField]="loginFieldTree.password" />
        </label>
        @if (loginFieldTree.password()?.invalid() && loginFieldTree.password()?.touched()) {
          <p class="error">{{ loginFieldTree.password().errors()[0].message }}</p>
        } -->
        <ind-input
          [formField]="loginFieldTree.password"
          [label]="'Password'"
          [type]="'password'"
        />
      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" [formField]="loginFieldTree.rememberMe" />
        <span>Remember me</span>
      </label>
      <button type="submit" [disabled]="loginFieldTree().invalid()">Login</button>
    </form>
    <pre>{{ loginFieldTree().value() | json }}</pre>
  `,
})
export class LoginFormSignals {

  readonly #auth = inject(Auth)
  readonly #router = inject(Router)

  readonly #initialState: LoginModel = {
    email: '',
    password: '',
    rememberMe: false,
  };

  readonly #loginModel = signal<LoginModel>(this.#initialState);

  readonly #loginFormSchema = (path: SchemaPathTree<LoginRequest, PathKind.Root>) => {
    required(path.email, { message: 'El email es obligatorio' });
    email(path.email, { message: 'El email debe ser una dirección de correo válida' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
  };

  protected readonly loginFieldTree = form(
    this.#loginModel, 
    this.#loginFormSchema,
    {submission: {action: this.onSubmit.bind(this)}}
  );

  async onSubmit(ft: FieldTree<LoginModel>) {
    const formData = ft().value();
    console.log('LoginFormSignals.onSubmit', formData);
     const state = await this.#auth.loginPromise(formData, {});
    // Reset the form after submission
    ft().reset(this.#initialState);
    console.log('Login result:', state);
    // Navigate to the home page after successful login
    this.#router.navigate(['home']);
  }
}
