import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingpageComponent } from './landingpage.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LandingpageComponent],
      declarations: [],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } } // Provide a mock for ActivatedRoute
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});