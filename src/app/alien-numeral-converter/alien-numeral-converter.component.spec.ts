import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlienNumeralConverterComponent } from './alien-numeral-converter.component';

describe('AlienNumeralConverterComponent', () => {
  let component: AlienNumeralConverterComponent;
  let fixture: ComponentFixture<AlienNumeralConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlienNumeralConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlienNumeralConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
