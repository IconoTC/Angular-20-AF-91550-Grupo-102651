import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormMdRx } from './login-form-md-rx';

describe('LoginFormMdRx', () => {
  let component: LoginFormMdRx;
  let fixture: ComponentFixture<LoginFormMdRx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormMdRx],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormMdRx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
