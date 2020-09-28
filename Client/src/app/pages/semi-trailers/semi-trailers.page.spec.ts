import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SemiTrailersPage } from './semi-trailers.page';

describe('SemiTrailersPage', () => {
  let component: SemiTrailersPage;
  let fixture: ComponentFixture<SemiTrailersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemiTrailersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SemiTrailersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
