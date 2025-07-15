import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraJurosCompostosComponent } from './calculadora-juros-compostos.component';

describe('CalculadoraJurosCompostosComponent', () => {
  let component: CalculadoraJurosCompostosComponent;
  let fixture: ComponentFixture<CalculadoraJurosCompostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraJurosCompostosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraJurosCompostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
