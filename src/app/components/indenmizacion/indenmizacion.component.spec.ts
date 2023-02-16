import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndenmizacionComponent } from './indenmizacion.component';

describe('IndenmizacionComponent', () => {
  let component: IndenmizacionComponent;
  let fixture: ComponentFixture<IndenmizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndenmizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndenmizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
