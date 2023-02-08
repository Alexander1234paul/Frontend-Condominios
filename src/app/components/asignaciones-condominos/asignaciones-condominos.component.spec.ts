import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesCondominosComponent } from './asignaciones-condominos.component';

describe('AsignacionesCondominosComponent', () => {
  let component: AsignacionesCondominosComponent;
  let fixture: ComponentFixture<AsignacionesCondominosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionesCondominosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesCondominosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
