import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoCoders } from './logo-coders';

describe('LogoCoders', () => {
  let component: LogoCoders;
  let fixture: ComponentFixture<LogoCoders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoCoders],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoCoders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run handleClick when upper is clicked', () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const upperElement = fixture.nativeElement.querySelector('#upper');
    upperElement.dispatchEvent(new Event('click'));
    expect(console.log).toHaveBeenCalledWith('Logo upper clicked');
  });

  it('should run handleClick when lower is clicked', () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const lowerElement = fixture.nativeElement.querySelector('#lower');
    lowerElement.dispatchEvent(new Event('click'));
    expect(console.log).toHaveBeenCalledWith('Logo lower clicked');
  });
});
