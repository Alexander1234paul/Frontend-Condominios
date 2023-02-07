import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubReporteComponent } from './sub-reporte.component';

describe('SubReporteComponent', () => {
  let component: SubReporteComponent;
  let fixture: ComponentFixture<SubReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
