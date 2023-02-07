import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAlquilerComponent } from './sub-alquiler.component';

describe('SubAlquilerComponent', () => {
  let component: SubAlquilerComponent;
  let fixture: ComponentFixture<SubAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAlquilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
