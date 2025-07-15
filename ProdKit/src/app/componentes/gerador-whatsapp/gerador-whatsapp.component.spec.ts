import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorWhatsappComponent } from './gerador-whatsapp.component';

describe('GeradorWhatsappComponent', () => {
  let component: GeradorWhatsappComponent;
  let fixture: ComponentFixture<GeradorWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorWhatsappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeradorWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
