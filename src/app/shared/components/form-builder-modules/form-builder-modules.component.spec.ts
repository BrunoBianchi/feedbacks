import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderModulesComponent } from './form-builder-modules.component';

describe('FormBuilderModulesComponent', () => {
  let component: FormBuilderModulesComponent;
  let fixture: ComponentFixture<FormBuilderModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBuilderModulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
