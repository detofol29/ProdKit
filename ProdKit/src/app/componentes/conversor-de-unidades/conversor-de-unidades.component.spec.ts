import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversorDeUnidadesComponent } from './conversor-de-unidades.component';

describe('ConversorDeUnidadesComponent', () => {
  let component: ConversorDeUnidadesComponent;
  let fixture: ComponentFixture<ConversorDeUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversorDeUnidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversorDeUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
