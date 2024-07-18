import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInfoBarComponent } from './header-info-bar.component';

describe('HeaderInfoBarComponent', () => {
  let component: HeaderInfoBarComponent;
  let fixture: ComponentFixture<HeaderInfoBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderInfoBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
