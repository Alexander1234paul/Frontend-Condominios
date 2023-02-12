import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcondominoComponent } from './subcondomino.component';

describe('SubcondominoComponent', () => {
  let component: SubcondominoComponent;
  let fixture: ComponentFixture<SubcondominoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcondominoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcondominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
