import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkersPage } from './workers.page';

describe('WorkersPage', () => {
  let component: WorkersPage;
  let fixture: ComponentFixture<WorkersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
