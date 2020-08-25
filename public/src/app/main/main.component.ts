import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "readTime" })
export class ReadTimePipe implements PipeTransform {
  transform(value: String): number {
    let myString = value.trim()
    let min = Math.floor(myString.length / 1500);
    if (min < 1) {
      return (min = 1);
    } else {
      return min;
    }
  }
}

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  posts: any;
  userLoggedID: any;
  userName: any;

  constructor(
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.getAll();
    this.userLoggedID = sessionStorage.getItem("User");
    this.userName = sessionStorage.getItem("UserName");
  }

  getAll() {
    let tempObservable = this._httpService.getallPosts();
    tempObservable.subscribe(data => {
      console.log("Retrieved all posts", data);
      this.posts = data["posts"];
    });
  }

  searchClicked() {
    console.log("Search Button was clicked");
  }

  subscribeClicked() {
    console.log("Subscribe button clicked");
  }

  removeHtml(input): any {
    return new DOMParser().parseFromString(input, "text/html").documentElement
      .textContent;
  }
}
