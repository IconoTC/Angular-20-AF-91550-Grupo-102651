import { Component, input } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { LoginFormTd } from '../components/login-form-td/login-form-td';
import { RouterLink } from '@angular/router';
import { LoginFormMdRx } from '../components/login-form-md-rx/login-form-md-rx';
import { LoginFormSignals } from '../components/login-form-signals/login-form-signals';

type FormType = 'td' | 'md-rx' | 'signals';

@Component({
  imports: [Card, LoginFormTd, LoginFormMdRx, LoginFormSignals, RouterLink],
  selector: 'ind-login-page',
  styles: ``,
  template: `
    <h2>Login</h2>
    @if (formType() === 'td') {
      <p>Ejemplo de Template Driven Form</p>
      <ind-card>
        <ind-login-form-td />
      </ind-card>
    } @else if (formType() === 'md-rx') {
      <p>Ejemplo de Model Driven Form (RxJs)</p>
      <ind-card>
        <ind-login-form-md-rx />
      </ind-card>
    } @else if (formType() === 'signals') {
      <p>Ejemplo de Signals Form</p>
      <ind-card>
        <ind-login-form-signals />
      </ind-card>
    }
    <p>Si no tienes cuenta, <a [routerLink]="['/auth', 'register']">regístrate aquí</a>.</p>
  `,
})
export default class LoginPage {
  protected readonly formType = input<FormType>();

  // Para conoder inicialmente el valor del input 
  // constructor() {
  //   effect(() => {
  //     console.log('Form Type', this.formType());
  //   });
  // }
}
