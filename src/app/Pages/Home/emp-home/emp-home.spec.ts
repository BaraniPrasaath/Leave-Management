import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpHome } from './emp-home';

describe('EmpHome', () => {
  let component: EmpHome;
  let fixture: ComponentFixture<EmpHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpHome],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
