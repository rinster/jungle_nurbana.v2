import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-userdashprofile",
  templateUrl: "./userdashprofile.component.html",
  styleUrls: ["./userdashprofile.component.css"]
})
export class UserdashprofileComponent implements OnInit {
  name: String;
  userInfo: any;
  userId: String;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((param: Params) => {
      console.log("This info was passed to Userdashprofilecomponent:", param);
      console.log("Userashprofilecomponent Received ID", param.id);
      const userinSession = sessionStorage.getItem("User");
      this.userId = userinSession;
      if (userinSession) {
        this.getuser(param.id);
      } else {
        return;
      }
    });
  }

  getuser(id) {
    let tempObservable = this._httpService.getUserbyId(id);
    tempObservable.subscribe(data => {
      console.log("GOT User USERDASHprofile COMPONENT!", data);
      this.name = data["name"];
      this.userInfo = data['userprofile'][0];
    });
  }

  goToEdit() {
    this._router.navigate(["/userdash/", this.userId, "updateprofile" ]);
  }

}
