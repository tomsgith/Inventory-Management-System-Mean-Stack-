import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesformComponent } from './salesform.component';

describe('SalesformComponent', () => {
  let component: SalesformComponent;
  let fixture: ComponentFixture<SalesformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
