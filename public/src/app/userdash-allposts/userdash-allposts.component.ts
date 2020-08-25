import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-userdash-allposts",
  templateUrl: "./userdash-allposts.component.html",
  styleUrls: ["./userdash-allposts.component.css"]
})
export class UserdashAllpostsComponent implements OnInit {
  userID: any;
  posts: Array<any>;
  noPosts = false;

  constructor(
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((param: Params) => {
      console.log("This info was passed to AllPOST component:", param);
      console.log("SHOW Page Received ID", param.id);
      this.userID = param.id;
      this.getAll(this.userID);
    });
  }

  getAll(id) {
    let tempObservable = this._httpService.getPosts(id);
    tempObservable.subscribe(data => {
      console.log("Retrieved all posts", data);
      if (data["posts"].length == 0) {
        this.noPosts = true;
      } else {
        this.posts = data["posts"];
      }
    });
  }

  removeHtml(input): any {
    return new DOMParser().parseFromString(input, "text/html").documentElement
      .textContent;
  }

  invoke() {
    this.ngOnInit();
  }
}
