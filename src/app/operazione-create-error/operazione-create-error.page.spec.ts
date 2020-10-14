import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperazioneCreateErrorPage } from './operazione-create-error.page';

describe('OperazioneCreateErrorPage', () => {
  let component: OperazioneCreateErrorPage;
  let fixture: ComponentFixture<OperazioneCreateErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperazioneCreateErrorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperazioneCreateErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
