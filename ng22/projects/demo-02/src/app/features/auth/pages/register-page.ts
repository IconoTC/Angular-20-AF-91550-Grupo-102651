import { Component } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { RegisterForm } from '../components/register-form/register-form';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Card, RegisterForm, RouterLink],
  selector: 'ind-register-page',
  styles: ``,
  template: `
    <h2>Register</h2>
    <ind-card>
      <ind-register-form />
    </ind-card>
    <p>Si ya tienes cuenta, <a [routerLink]="['/auth', 'login']">inicia sesión aquí</a>.</p>
  `,
})
export default class RegisterPage {}
