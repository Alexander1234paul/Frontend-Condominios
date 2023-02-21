import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSeguridadComponent } from './sub-seguridad.component';

describe('SubSeguridadComponent', () => {
  let component: SubSeguridadComponent;
  let fixture: ComponentFixture<SubSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSeguridadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
