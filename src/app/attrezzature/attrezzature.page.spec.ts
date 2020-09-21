import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttrezzaturePage } from './attrezzature.page';

describe('AttrezzaturePage', () => {
  let component: AttrezzaturePage;
  let fixture: ComponentFixture<AttrezzaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttrezzaturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttrezzaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
