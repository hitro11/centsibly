import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavCommunityItemComponent } from './sidenav-community-item.component';

describe('SidenavCommunityItemComponent', () => {
    let component: SidenavCommunityItemComponent;
    let fixture: ComponentFixture<SidenavCommunityItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidenavCommunityItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SidenavCommunityItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
