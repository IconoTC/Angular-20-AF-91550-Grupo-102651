import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toggle } from './toggle';
import { By } from '@angular/platform-browser';

describe('Toggle', () => {
  let component: Toggle;
  let fixture: ComponentFixture<Toggle>;

  let elementSpanLight: HTMLSpanElement;
  let elementSpanDark: HTMLSpanElement;
  let elementInput: HTMLInputElement;

  beforeEach(() => {
    elementSpanLight = fixture.nativeElement.querySelector('span[aria-label="Light Theme"]');
    elementSpanDark = fixture.nativeElement.querySelector('span[aria-label="Dark Theme"]');
    const debugElementInput = fixture.debugElement.query(By.css('input'));
    elementInput = debugElementInput.nativeElement as HTMLInputElement;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toggle],
    }).compileComponents();

    fixture = TestBed.createComponent(Toggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have left label when unchecked', () => {
    expect(elementSpanLight.hidden).toBe(true);
    expect(elementSpanDark.textContent).toBe('Oscuro');
    expect(elementSpanDark.hidden).toBe(false);
    expect(elementInput.checked).toBe(false);
  });

  it('should have right label when checked', async () => {
    elementInput.click();
    await fixture.whenStable();
    expect(elementSpanLight.textContent).toBe('Claro');
    expect(elementSpanLight.hidden).toBe(false);
    expect(elementSpanDark.hidden).toBe(true);
    expect(elementInput.checked).toBe(true);
  });
});
