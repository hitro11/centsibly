import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupAccountContainerComponent } from './setup-account-container.component';

describe('SetupAccountContainerComponent', () => {
    let component: SetupAccountContainerComponent;
    let fixture: ComponentFixture<SetupAccountContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SetupAccountContainerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SetupAccountContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
