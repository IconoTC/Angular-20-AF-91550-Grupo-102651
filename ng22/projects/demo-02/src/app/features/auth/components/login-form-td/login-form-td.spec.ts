import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormTd } from './login-form-td';

describe('LoginFormTd', () => {
  let component: LoginFormTd;
  let fixture: ComponentFixture<LoginFormTd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormTd],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormTd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
