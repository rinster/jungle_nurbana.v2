import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  error: String;
  userLogged: any;
  message: String;
  userId: string

  constructor(
    private _router: Router,
    private _httpService: HttpService,
  ) {}

  ngOnInit() {
    this.userLogged = {
      email: "",
      password: ""
    };
  }

  loginClicked(form: NgForm) {
    console.log("Login Clicked");
    if (form.invalid) {
      this.isSubmitted = true;
      return;
    } else {
      console.log("Logging in...", this.userLogged);
      let tempObservable = this._httpService.login(this.userLogged);
      tempObservable.subscribe(data => {
        console.log("Login Status", data);
        if(data['error']) {
          this.isSubmitted = true;
          this.error = data['error'];
        } else {
          this.userId = data['userID'];
          sessionStorage.setItem("User", this.userId);
          sessionStorage.setItem("UserName", data['session']['name'])
          this._router.navigate(["/userdash/", this.userId, "userprofile", this.userId]);
        }
      })
    }
  }
}
