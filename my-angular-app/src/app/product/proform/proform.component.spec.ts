import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformComponent } from './proform.component';

describe('ProformComponent', () => {
  let component: ProformComponent;
  let fixture: ComponentFixture<ProformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
