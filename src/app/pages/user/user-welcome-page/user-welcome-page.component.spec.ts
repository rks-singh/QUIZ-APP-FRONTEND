import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWelcomePageComponent } from './user-welcome-page.component';

describe('UserWelcomePageComponent', () => {
  let component: UserWelcomePageComponent;
  let fixture: ComponentFixture<UserWelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWelcomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
