import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sample } from './sample';
import { By } from '@angular/platform-browser';

describe('Sample', () => {
  let component: Sample;
  let fixture: ComponentFixture<Sample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample],
    }).compileComponents();

    fixture = TestBed.createComponent(Sample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render sample component', async () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toContain('sample component');
  });
  
  it('should render sample component (ussing dabugElement)', async () => {
    const debugElement = fixture.debugElement;
    const h2Element = debugElement.query(By.css('h2'))?.nativeElement;
    expect(h2Element?.textContent).toContain('sample component');
  }); 
});

