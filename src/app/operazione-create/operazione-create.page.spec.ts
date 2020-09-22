import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperazioneCreatePage } from './operazione-create.page';

describe('OperazioneCreatePage', () => {
  let component: OperazioneCreatePage;
  let fixture: ComponentFixture<OperazioneCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperazioneCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperazioneCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
