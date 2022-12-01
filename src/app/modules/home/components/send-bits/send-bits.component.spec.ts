import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBitsComponent } from './send-bits.component';

describe('SendBitsComponent', () => {
  let component: SendBitsComponent;
  let fixture: ComponentFixture<SendBitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendBitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
