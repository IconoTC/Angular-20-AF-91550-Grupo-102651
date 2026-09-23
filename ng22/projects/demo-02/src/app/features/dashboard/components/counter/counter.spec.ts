import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';

const COUNTER_MOCK = { id: 1, value: 0, clicks: 0 };

describe('Counter', () => {
  let component: Counter;
  let fixture: ComponentFixture<Counter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
    }).compileComponents();

    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('counter', COUNTER_MOCK);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the initial values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const outputs = compiled.querySelectorAll('output');
    expect(compiled.querySelector('h3')?.textContent).toContain('Contador 1');
    expect(outputs[0].textContent).toContain('0');
    expect(outputs[1].textContent).toContain('0');
  });

  it('should increment the count when the button ➕  is clicked', () => {
    vi.spyOn(component.counterChange, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const outputs = compiled.querySelectorAll('output');
    const buttons = compiled.querySelectorAll('button');
    buttons[0].click();
    fixture.detectChanges();
    expect(outputs[0].textContent).toContain('1');
    expect(outputs[1].textContent).toContain('1');
    expect(component.counterChange.emit).toHaveBeenCalledWith({ id: 1, value: 1, clicks: 1 });
  });
});
