import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedBitsComponent } from './received-bits.component';

describe('ReceivedBitsComponent', () => {
  let component: ReceivedBitsComponent;
  let fixture: ComponentFixture<ReceivedBitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedBitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedBitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
