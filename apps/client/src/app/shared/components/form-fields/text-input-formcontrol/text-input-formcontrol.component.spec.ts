import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputFormcontrolComponent } from './text-input-formcontrol.component';

describe('TextInputFormcontrolComponent', () => {
  let component: TextInputFormcontrolComponent;
  let fixture: ComponentFixture<TextInputFormcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputFormcontrolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputFormcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
