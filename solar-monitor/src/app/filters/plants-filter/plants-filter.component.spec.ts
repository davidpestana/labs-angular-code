import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsFilterComponent } from './plants-filter.component';

describe('PlantsFilterComponent', () => {
  let component: PlantsFilterComponent;
  let fixture: ComponentFixture<PlantsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
