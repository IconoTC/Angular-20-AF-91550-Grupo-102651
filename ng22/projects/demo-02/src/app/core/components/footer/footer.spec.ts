import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a address with 2 paragraphs', async () => {
    const autor = component['author']();
    const brand = component['brand']();

    const today = 2000;
    component['today'].set(new Date('2000-01-01'));
    await fixture.whenStable();

    const addressElement: HTMLElement = debugElement.query(By.css('address')).nativeElement;
    expect(addressElement).toBeTruthy();
    const pElements: HTMLParagraphElement[] = debugElement
      .queryAll(By.css('p'))
      .map((de) => de.nativeElement);
    expect(pElements[0].textContent).toEqual(autor);
    expect(pElements[1].textContent).toContain(brand);
    expect(pElements[1].textContent).toContain(today.toString());
  });
});
