import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Info } from './info';
import { TimeService } from '../../../../core/services/time';

const timeServiceMock = {
  getTime: vi.fn().mockReturnValue(1234567890),
};


describe('Info', () => {
  let component: Info;
  let fixture: ComponentFixture<Info>;
  let service: TimeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Info],
    }).compileComponents();

    TestBed.overrideProvider(TimeService, { useValue: timeServiceMock });

    fixture = TestBed.createComponent(Info);
    component = fixture.componentInstance;
    service = TestBed.inject(TimeService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have render the timeStamp property defined', () => {
    const divElement = fixture.nativeElement.querySelector('div');
    expect(divElement.textContent.trim()).toEqual('1234567890');
    expect(service.getTime).toHaveBeenCalled();
  });
});
