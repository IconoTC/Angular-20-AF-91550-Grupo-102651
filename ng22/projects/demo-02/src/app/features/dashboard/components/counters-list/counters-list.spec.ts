import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountersList } from './counters-list';
import { By } from '@angular/platform-browser';
import { Counter } from '../counter/counter';

describe('CountersList', () => {
  let component: CountersList;
  let fixture: ComponentFixture<CountersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountersList],
    }).compileComponents();

    fixture = TestBed.createComponent(CountersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the initial state', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Counters');
    expect(compiled.querySelector('p:nth-of-type(1)')?.textContent).toContain('Total: 1');
    expect(compiled.querySelector('p:nth-of-type(2)')?.textContent).toContain('Clicks: 0');
    expect(compiled.querySelectorAll('ind-counter').length).toBe(3);
  });

  it.only ('should update the total and total clicks when a counter is changed', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //const counterComponent = compiled.querySelector('ind-counter') as HTMLElement;
    //const counterInstance = fixture.debugElement.children[0].componentInstance ;

    const counters = fixture.debugElement.queryAll(By.directive(Counter));
    counters[0].triggerEventHandler('counterChange', { id: 102, value: 5, clicks: 3 });
    fixture.detectChanges();

    expect(compiled.querySelector('p:nth-of-type(1)')?.textContent).toContain('Total: 5');
    expect(compiled.querySelector('p:nth-of-type(2)')?.textContent).toContain('Clicks: 3');
  });
});
