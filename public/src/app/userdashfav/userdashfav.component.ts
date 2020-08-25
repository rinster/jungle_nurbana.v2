import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-userdashfav",
  templateUrl: "./userdashfav.component.html",
  styleUrls: ["./userdashfav.component.css"]
})
export class UserdashfavComponent implements OnInit {
  noFavorites = true;
  userId: String;
  favPostIDs: Array<any>;
  favPosts: Array<any>;

  constructor(
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.userId = sessionStorage.getItem("User");
    this.getFavorites();
  }

  getFavorites() {
    let tempObservable = this._httpService.getFavs(this.userId);
    tempObservable.subscribe(data => {
      if (!this.favPostIDs) {
        this.favPostIDs = [];
      }
      console.log("Got favorites: ", data);
      for (var i = 0; i < data["favs"].length; i++) {
        this.favPostIDs.push(data["favs"][i]["favPostId"]);
      }
      console.log("all favs:", this.favPostIDs);
      this.getFavPosts(this.favPostIDs);
    });
  }

  getFavPosts(ids) {
    let tempObservable = this._httpService.getfavposts(ids);
    tempObservable.subscribe(data => {
      console.log("Reponse server on get fav posts: ", data);
      if (data["favPosts"].length >= 1) {
        this.noFavorites = false;
        return (this.favPosts = data["favPosts"]);
      } else {
        this.noFavorites = true;
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
