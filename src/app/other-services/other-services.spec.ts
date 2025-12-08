import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherServices } from './other-services';

describe('OtherServices', () => {
  let component: OtherServices;
  let fixture: ComponentFixture<OtherServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
