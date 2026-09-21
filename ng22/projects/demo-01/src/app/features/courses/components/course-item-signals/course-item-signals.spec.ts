import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemSignals } from './course-item-signals';

describe('CourseItemSignals', () => {
  let component: CourseItemSignals;
  let fixture: ComponentFixture<CourseItemSignals>;

   afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemSignals],
    }).compileComponents();
  });

  const createComponent = () => {
    fixture = TestBed.createComponent(CourseItemSignals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should render the course title in uppercase', () => {
    createComponent();
    const element = fixture.nativeElement as HTMLElement;
    const titleElement = element.querySelector('h2');
    expect(titleElement?.textContent).toContain(component['course']().title.toUpperCase());
  });

  it('should render the course title after 3 seconds', async () => {
    vi.useFakeTimers();
    createComponent();
    const element = fixture.nativeElement as HTMLElement;
    const titleElement = element.querySelector('h2');
    expect(titleElement?.textContent).toContain(component['course']().title.toUpperCase());
    vi.advanceTimersByTime(3100);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(titleElement?.textContent).toContain('Curso de Angular con Signals'.toUpperCase());
  });
});
