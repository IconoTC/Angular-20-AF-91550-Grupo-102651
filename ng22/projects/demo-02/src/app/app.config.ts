import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ERROR_LEVEL } from './core/services/logger';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    {
      provide: ERROR_LEVEL, useValue: environment.loggerLevel
    }
  ],
};
