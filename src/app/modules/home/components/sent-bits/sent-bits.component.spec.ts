import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentBitsComponent } from './sent-bits.component';

describe('SentBitsComponent', () => {
  let component: SentBitsComponent;
  let fixture: ComponentFixture<SentBitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentBitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentBitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
