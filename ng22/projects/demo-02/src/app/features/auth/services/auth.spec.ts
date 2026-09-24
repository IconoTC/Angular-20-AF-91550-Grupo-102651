import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  afterEach(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return a successful login response', () => {
      vi.useFakeTimers();
      const loginRequest = {
        email: 'user@example.com',
        password: 'password123',
        rememberMe: true,
      };

      const options = {
        success: true,
        delayTime: 1000,
      };

      const loginResponse = service.login(loginRequest, options);

      expect(loginResponse).toBeDefined();

      loginResponse.subscribe((response) => {
        expect(response.error).toBe('');
        expect(response.token).toBeDefined();
        expect(response.info).toBeDefined();
        expect(response.info?.email).toBe(loginRequest.email);
        expect(response.info?.rememberMe).toBe(loginRequest.rememberMe);
      });

      vi.advanceTimersByTime(1000);
    });

    it('should return an error login response', () => {
      vi.useFakeTimers();
      const loginRequest = {
        email: 'user@example.com',
        password: 'wrongpassword',
        rememberMe: true,
      };

      const options = {
        success: false,
        delayTime: 1000,
      };

      const loginResponse = service.login(loginRequest, options);

      expect(loginResponse).toBeDefined();

      loginResponse.subscribe((response) => {
        expect(response.error).toBe('Invalid email or password');
        expect(response.token).toBeUndefined();
        expect(response.info).toBeUndefined();
      });

      vi.advanceTimersByTime(1000);
    });
  });

  describe('loginPromise', () => {
    it('should return a successful login response', async () => {
      const loginRequest = {
        email: 'user@example.com',
        password: 'password123',
        rememberMe: true,
      };

      const options = {
        success: true,
        delayTime: 100,
      };

      const loginResponse = await service.loginPromise(loginRequest, options);

      expect(loginResponse.error).toBe('');
      expect(loginResponse.token).toBeDefined();
      expect(loginResponse.info).toBeDefined();
      expect(loginResponse.info?.email).toBe(loginRequest.email);
      expect(loginResponse.info?.rememberMe).toBe(loginRequest.rememberMe);
    });

    it('should return an error login response', async () => {
      const loginRequest = {
        email: 'user@example.com',
        password: 'wrongpassword',
        rememberMe: true,
      };

      const options = {
        success: false,
        delayTime: 100,
      };

      const loginResponse = await service.loginPromise(loginRequest, options);

      expect(loginResponse.error).toBe('Credenciales incorrectas');
      expect(loginResponse.token).toBe('');
      expect(loginResponse.info).toBeUndefined();
    });

  }); 
});
