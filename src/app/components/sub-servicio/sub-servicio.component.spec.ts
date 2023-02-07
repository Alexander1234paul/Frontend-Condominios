import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServicioComponent } from './sub-servicio.component';

describe('SubServicioComponent', () => {
  let component: SubServicioComponent;
  let fixture: ComponentFixture<SubServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
