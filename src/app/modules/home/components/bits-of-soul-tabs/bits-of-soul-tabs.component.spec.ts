import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitsOfSoulTabsComponent } from './bits-of-soul-tabs.component';

describe('BitsOfSoulTabsComponent', () => {
  let component: BitsOfSoulTabsComponent;
  let fixture: ComponentFixture<BitsOfSoulTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitsOfSoulTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitsOfSoulTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
