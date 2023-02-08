import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominoComponent } from './condomino.component';

describe('CondominoComponent', () => {
  let component: CondominoComponent;
  let fixture: ComponentFixture<CondominoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondominoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
