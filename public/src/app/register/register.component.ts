import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  newUser: any;
  isSubmitted = false;
  problems = false;
  confirmpw: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.newUser = {
      name: "",
      email: "",
      password: ""
    };
    this.confirmpw = {
      pwInput: ""
    };
  }

  createUser(form: NgForm) {
    if (
      form.invalid ||
      this.newUser.password!= this.confirmpw.pwInput
    ) {
      this.isSubmitted = true;
      return;
    } else {
      console.log("Creating User...", this.newUser);
      let tempObservable = this._httpService.registerUser(this.newUser);
      tempObservable.subscribe(data => {
        console.log("Created User received", data["error"]);
        if (data["error"]) {
          this.problems = true;
          this.isSubmitted = true;
          return;
        } else {
          console.log("User Successfully created");
          alert("Account Sucessfully Created, please login!")
          this._router.navigate(["/login"]);
          //THIS NEEDS A MODAL POPUP EVENT
          //SO USER KNOWS TO LOGIN
          //OR ---- YOU NEED TO CREATE A SESSION AND REROUTE USER TO DASHBOARD
        }
      });
    }
  }
}
