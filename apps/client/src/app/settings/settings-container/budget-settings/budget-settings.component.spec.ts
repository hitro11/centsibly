import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSettingsComponent } from './budget-settings.component';

describe('BudgetSettingsComponent', () => {
  let component: BudgetSettingsComponent;
  let fixture: ComponentFixture<BudgetSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
