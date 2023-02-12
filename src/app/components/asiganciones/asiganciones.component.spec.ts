import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigancionesComponent } from './asiganciones.component';

describe('AsigancionesComponent', () => {
  let component: AsigancionesComponent;
  let fixture: ComponentFixture<AsigancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsigancionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsigancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
