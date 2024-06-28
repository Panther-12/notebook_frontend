import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReverseCardComponent } from './reverse-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReverseCardComponent', () => {
  let component: ReverseCardComponent;
  let fixture: ComponentFixture<ReverseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ReverseCardComponent, RouterTestingModule, HttpClientTestingModule], 
      declarations: [],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } } // Provide a mock for ActivatedRoute
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReverseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});