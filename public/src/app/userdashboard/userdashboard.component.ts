import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-userdashboard",
  templateUrl: "./userdashboard.component.html",
  styleUrls: ["./userdashboard.component.css"]
})
export class UserdashboardComponent implements OnInit {
  name: String;
  userID: any;
  userInfo: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((param: Params) => {
      console.log("This info was passed to userdashboard component:", param);
      console.log("userdashboard component Received ID", param.id);
      const userinSession = sessionStorage.getItem("User");
      this.userID = param.id;
      if (!userinSession) {
        alert(" You are not logged in. Please login to your account")
        return this._router.navigate(["/login"]);
      } else {
        this.getuser(param.id);
      }
    });
  }

  getuser(id) {
    let tempObservable = this._httpService.getUserbyId(id);
    tempObservable.subscribe(data => {
      console.log("GOT User!", data);
      this.name = data["name"];
      this.userInfo = data;
    });
  }

  logoutClicked() {
    console.log("Logout clicked");
    let tempObervable = this._httpService.logout();
    tempObervable.subscribe(data => {
      console.log("Response: ", data);
      if (data) {
        sessionStorage.clear()
        this._router.navigate(["/home"]);
      } else {
        console.log("Error in logging out");
      }
    });
  }
}
