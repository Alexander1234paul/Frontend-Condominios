import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubContabilidadComponent } from './sub-contabilidad.component';

describe('SubContabilidadComponent', () => {
  let component: SubContabilidadComponent;
  let fixture: ComponentFixture<SubContabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubContabilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
