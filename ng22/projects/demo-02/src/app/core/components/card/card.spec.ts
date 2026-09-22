import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';
import { Component } from '@angular/core';

const TEXT = "Hello World";

@Component({
  imports: [Card],
  template: `<ind-card> {{ text }} </ind-card>`,
})
class TestHostComponent {
  protected readonly text = TEXT;
}

describe('Card', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the content', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('ind-card')?.textContent?.trim()).toBe(TEXT);
  })
});
