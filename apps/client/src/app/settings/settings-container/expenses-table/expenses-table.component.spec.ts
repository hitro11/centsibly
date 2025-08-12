import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesTableComponent } from './expenses-table.component';

describe('ExpensesTableComponent', () => {
  let component: ExpensesTableComponent;
  let fixture: ComponentFixture<ExpensesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
