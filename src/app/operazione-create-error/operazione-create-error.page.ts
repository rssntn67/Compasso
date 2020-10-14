import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-operazione-create-error',
  templateUrl: './operazione-create-error.page.html',
  styleUrls: ['./operazione-create-error.page.scss'],
})
export class OperazioneCreateErrorPage implements OnInit {

  id: string;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

    ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.params["id"];
  }

}
