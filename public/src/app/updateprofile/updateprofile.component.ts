import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  editProfile: any;
  userID: any;

  constructor(
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
      const userinSession = sessionStorage.getItem("User");
      this.userID = userinSession;

    this.editProfile = {
      header: "",
      expertise: "",
      bio: "",
      imageUrl: "",
    };
  }

  edit() {
    let tempObservable = this._httpService.editProfile(this.editProfile, this.userID);
    tempObservable.subscribe(data => {
      console.log("Server Response:", data)
    });
    this._router.navigate([
      "/userdash/",
      this.userID,
      "userprofile",
      this.userID
    ]);
  }

  cancel() {
    this._router.navigate([
      "/userdash/",
      this.userID,
      "userprofile",
      this.userID
    ]);
  }
}
