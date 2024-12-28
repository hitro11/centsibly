import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategorySummaryComponent } from './expense-category-summary.component';

describe('ExpenseCategorySummaryComponent', () => {
  let component: ExpenseCategorySummaryComponent;
  let fixture: ComponentFixture<ExpenseCategorySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseCategorySummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseCategorySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
