import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemPro } from './course-item-pro';

describe('CourseItemPro', () => {
  let component: CourseItemPro;
  let fixture: ComponentFixture<CourseItemPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemPro],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemPro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
