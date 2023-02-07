import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasPendientesComponent } from './cuentas-pendientes.component';

describe('CuentasPendientesComponent', () => {
  let component: CuentasPendientesComponent;
  let fixture: ComponentFixture<CuentasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasPendientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
