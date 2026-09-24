import { DestroyRef, inject, Service } from '@angular/core';
import { delay, firstValueFrom, Observable, of } from 'rxjs';
import { LoginRequest, LoginResponse } from '../types/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface AuthOptions {
  success: boolean;
  delayTime: number;
}

const DEFAULT_AUTH_OPTIONS: AuthOptions = {
  success: true,
  delayTime: 1000,
};

@Service()
export class Auth {
  #destroyRef = inject(DestroyRef);

  #generateToken(): string {
    // Generamos un token aleatorio simulado
    // (en un caso real, esto lo haría el backend)
    return Math.random().toString(36).substring(2);
  }

  #generateId(): number {
    // Generamos un id aleatorio simulado
    // (en un caso real, esto lo haría el backend)
    return Math.floor(Math.random() * 1000);
  }

  login(data: LoginRequest, options: Partial<AuthOptions>): Observable<LoginResponse> {
    // Simulamos una llamada a un servicio de autenticación
    // (en un caso real, esto lo haría el backend)

    const finalOptions = { ...DEFAULT_AUTH_OPTIONS, ...options };

    const hasError =
      !finalOptions.success || !data.email || !data.password || data.email.includes('error');

    const result = hasError
      ? {
          error: 'Credenciales incorrectas',
          token: '',
        }
      : {
          error: '',
          token: this.#generateToken(),
          info: {
            id: this.#generateId(),
            email: data.email,
            rememberMe: data.rememberMe,
            loginDate: new Date(),
          },
        };
    return of(result).pipe(delay(finalOptions.delayTime));
  }

  loginPromise(data: LoginRequest, options: Partial<AuthOptions>): Promise<LoginResponse> {
    return firstValueFrom(this.login(data, options).pipe(takeUntilDestroyed(this.#destroyRef)));
  }
}
