import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-userdashanalytics',
  templateUrl: './userdashanalytics.component.html',
  styleUrls: ['./userdashanalytics.component.css']
})
export class UserdashanalyticsComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
  }

}
