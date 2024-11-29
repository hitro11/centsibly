import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupExpensesComponent } from './setup-expenses.component';

describe('SetupExpensesComponent', () => {
  let component: SetupExpensesComponent;
  let fixture: ComponentFixture<SetupExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
