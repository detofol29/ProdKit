import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratorComponent } from './extrator.component';

describe('ExtratorComponent', () => {
  let component: ExtratorComponent;
  let fixture: ComponentFixture<ExtratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
