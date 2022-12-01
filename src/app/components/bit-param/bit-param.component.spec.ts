import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitParamComponent } from './bit-param.component';

describe('BitParamComponent', () => {
  let component: BitParamComponent;
  let fixture: ComponentFixture<BitParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
