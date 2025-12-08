import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceServices } from './assurance-services';

describe('AssuranceServices', () => {
  let component: AssuranceServices;
  let fixture: ComponentFixture<AssuranceServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssuranceServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssuranceServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
