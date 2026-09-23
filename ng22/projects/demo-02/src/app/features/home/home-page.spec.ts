import { TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import HomePage from './home-page';

describe('HomePage', () => {
  let harness: RouterTestingHarness;
  let debugHarness: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter(routes)],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    debugHarness = harness.fixture.debugElement

    await harness.fixture.whenStable();
    await harness.navigateByUrl('/home', HomePage);
  });

  it('should create', () => {
    expect(harness).toBeTruthy();
  });

  it('should have render the correct page title', () => {
    const compiled = debugHarness.nativeElement as HTMLElement;
    expect(compiled.querySelector('#home')?.textContent).toContain('Home');
  });
});
