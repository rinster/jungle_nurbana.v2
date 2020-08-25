import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  post: any;
  author: any;
  minRead: Number;
  postID: String;

  userLoggedID: any;
  userName: any;
  submitted = false;
  flashmsg = false;
  msg: String;

  fav: any;
  toggle = true;
  favoriteID: String;

  constructor(
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((param: Params) => {
      console.log("One POST component Received ID", param.id);
      this.getBlog(param.id);
      this.postID = param.id;
      this.userLoggedID = sessionStorage.getItem("User");
      this.userName = sessionStorage.getItem("UserName");
    });
    this.fav = {
      favPostId: this.postID,
      favoriterId: this.userLoggedID
    };
    this.checkFavorite(this.fav)
  }

  getBlog(id) {
    let tempObservable = this._httpService.getPostById(id);
    tempObservable.subscribe(data => {
      console.log("Got blog", data["post"]);
      this.post = data["post"][0];
      this.getUser(data["post"][0].author);
      this.timeToRead(data["post"][0].postText);
    });
  }

  getUser(id) {
    let tempObservable = this._httpService.getUserbyId(id);
    tempObservable.subscribe(data => {
      console.log("Got user", data);
      this.author = data;
    });
  }

  timeToRead(post) {
    let myString = post.trim();
    console.log("length: ", myString.length);
    let readtime = Math.floor(myString.length / 1500);
    if (readtime < 1) {
      return (this.minRead = 1);
    } else {
      this.minRead = readtime;
    }
  }

  checkFavorite(fav) {
    console.log("Checking for favorite...")
    let tempObservable = this._httpService.checkForFavorite(fav);
    tempObservable.subscribe(data => {
      console.log("Favorite Query Response", data);
      if(data['favorite'].length == 1) {
        this.toggle = false;
        this.favoriteID = data['favorite'][0]['_id']
        console.log("Got favpostID:", this.favoriteID)
      } else {
        console.log("No favorites were found")
      }
    });
  }

  enableDisableRule() {
    if (this.toggle) {
      this.likeClicked();
      this.toggle = false;
    } else {
      this.dislikeClicked();
      this.toggle = true;
    }
  }

  likeClicked() {
    console.log("Like was clicked:", this.fav);
    this.submitted = true;
    this.msg = "Added to Favorites!"
    let tempObservable = this._httpService.newLike(this.fav);
    tempObservable.subscribe(data => {
      console.log("Like was created", data);
    });
  }

  dislikeClicked() {
    console.log("Dislike was clicked");
    this.flashmsg = true;
    this.msg = "Removed from Favorites!"
    let tempObservable = this._httpService.deleteLike(this.favoriteID);
    tempObservable.subscribe(data => {
      console.log("Delete Like", data);
    });
  }
}
