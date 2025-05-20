import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatadorComponent } from './formatador.component';

describe('FormatadorComponent', () => {
  let component: FormatadorComponent;
  let fixture: ComponentFixture<FormatadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
