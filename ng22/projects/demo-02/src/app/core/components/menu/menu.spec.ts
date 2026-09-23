import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { By } from '@angular/platform-browser';
import { MenuOption } from '../../types/menu-option';
import { provideRouter } from '@angular/router';

const mockMenuOptions: MenuOption[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Cursos', path: '/cursos' },
  { label: 'Acerca de', path: '/acerca-de' }
];

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [provideRouter([])], // Proporciona un enrutador vacío para las pruebas
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', mockMenuOptions);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the menu items', () => {
    const options = component['options']();
    options.forEach((option, index) => {
      const itemElement: HTMLLIElement = fixture.debugElement.queryAll(By.css('li'))[index]
        .nativeElement;
      expect(itemElement.textContent).toContain(option.label);
      const linkElement: HTMLAnchorElement = itemElement.querySelector('a')!;
      expect(linkElement.getAttribute('href')).toBe(option.path);
    });
  });
});
