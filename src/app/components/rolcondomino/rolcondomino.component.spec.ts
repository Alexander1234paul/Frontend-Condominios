import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolcondominoComponent } from './rolcondomino.component';

describe('RolcondominoComponent', () => {
  let component: RolcondominoComponent;
  let fixture: ComponentFixture<RolcondominoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolcondominoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolcondominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
