import { Routes } from "@angular/router";

export const authRoutes: Routes =  [
        {
        path: 'login',
        redirectTo: 'login/td',
      },
      {
        path: 'login/:formType',
        loadComponent: () => import('../pages/login-page'),
        title: 'Login | Demo 02',
      },
      {
        path: 'register',
        loadComponent: () => import('../pages/register-page'),
        title: 'Register | Demo 02',
      }
    ]