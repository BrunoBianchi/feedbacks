import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageSimulatorComponent } from './webpage-simulator.component';

describe('WebpageSimulatorComponent', () => {
  let component: WebpageSimulatorComponent;
  let fixture: ComponentFixture<WebpageSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebpageSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebpageSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
