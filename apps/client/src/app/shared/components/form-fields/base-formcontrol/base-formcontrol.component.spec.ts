import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormcontrolComponent } from './base-formcontrol.component';

describe('BaseFormcontrolComponent', () => {
  let component: BaseFormcontrolComponent;
  let fixture: ComponentFixture<BaseFormcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormcontrolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFormcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
