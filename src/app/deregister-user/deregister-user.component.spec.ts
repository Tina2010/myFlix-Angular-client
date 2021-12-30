import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeregisterUserComponent } from './deregister-user.component';

describe('DeregisterUserComponent', () => {
  let component: DeregisterUserComponent;
  let fixture: ComponentFixture<DeregisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeregisterUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeregisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
