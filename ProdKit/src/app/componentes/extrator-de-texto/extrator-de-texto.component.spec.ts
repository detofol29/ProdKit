import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratorDeTextoComponent } from './extrator-de-texto.component';

describe('ExtratorDeTextoComponent', () => {
  let component: ExtratorDeTextoComponent;
  let fixture: ComponentFixture<ExtratorDeTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtratorDeTextoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtratorDeTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
