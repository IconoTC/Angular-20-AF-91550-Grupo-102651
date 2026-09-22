import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Search } from './search';
import { By } from '@angular/platform-browser';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search],
    }).compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should type a search term and see it in the input', async () => {
    const elementInput: HTMLInputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;

    elementInput.value = 'User search term';
    elementInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const spanElement: HTMLParagraphElement = fixture.debugElement.query(
      By.css('span'),
    ).nativeElement;
    expect(spanElement.textContent).toContain('User search term');
  });

  it('should reset the search term when the reset button is clicked', async () => {
    
    const elementInput: HTMLInputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    const focusSpy = vi.spyOn(elementInput, 'focus');

    elementInput.value = 'User search term';
    elementInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const resetButton = fixture.debugElement.query(By.css('button'));
    resetButton.triggerEventHandler('click', null);
    // .nativeElement.click();
    await fixture.whenStable();

    const spanElement: HTMLParagraphElement = fixture.debugElement.query(
      By.css('span'),
    ).nativeElement;
    expect(spanElement.textContent).toContain('Esperando');
    expect(elementInput.value).toBe('');
    expect(focusSpy).toHaveBeenCalled();
  });
});
