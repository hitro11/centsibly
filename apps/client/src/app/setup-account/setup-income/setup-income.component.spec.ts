import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupIncomeComponent } from './setup-income.component';

describe('SetupIncomeComponent', () => {
    let component: SetupIncomeComponent;
    let fixture: ComponentFixture<SetupIncomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SetupIncomeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SetupIncomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
