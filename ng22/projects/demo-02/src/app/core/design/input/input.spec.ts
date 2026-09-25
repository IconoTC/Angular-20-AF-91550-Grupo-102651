import { ComponentFixture, TestBed } from '@angular/core/testing';

import { form, FormField, required, SchemaPathTree } from '@angular/forms/signals';
import { signal, Component } from '@angular/core';
import { Input } from './input';

interface MockModel {
  name: string;
}

const  MOCK_MODEL = signal<MockModel>({
    name: '',
  });


@Component({
  selector: 'ind-test-host',
  imports: [Input, FormField],
  template: `
    <form>
      <ind-input
        [label]="'Testing input'"
        [type]="'text'"
        [formField]="fieldTree.name"
      />
    </form>
  `,
})
class TestHostComponent {
  mockModel = MOCK_MODEL;
  schema = (path: SchemaPathTree<MockModel>) => {
    required(path.name, { message: 'Name is required' });
  };

  fieldTree = form(this.mockModel, this.schema);
}


describe('Input', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Input],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
