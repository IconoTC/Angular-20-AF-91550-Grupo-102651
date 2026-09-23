import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('app-title', 'Curso Test');
    fixture.componentRef.setInput('subtitle', 'Aprende a desarrollar aplicaciones con Angular');
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test de implementación
  //Caja blanca
  it('should have as title "Curso de Angular 22"', () => {
    expect(component['title']()).toContain('Curso');
    expect(component['subtitle']()).toContain('Aprende a desarrollar aplicaciones con Angular');
  });

  // Test de comportamiento
  // Test de caja negra
  it('should render title', async () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Curso');
    expect(element.querySelector('p')?.textContent).toContain('Aprende a desarrollar aplicaciones con Angular');
  });
});
