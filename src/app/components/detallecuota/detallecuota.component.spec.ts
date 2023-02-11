import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecuotaComponent } from './detallecuota.component';

describe('DetallecuotaComponent', () => {
  let component: DetallecuotaComponent;
  let fixture: ComponentFixture<DetallecuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallecuotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallecuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
