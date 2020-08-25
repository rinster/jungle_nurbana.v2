import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  // author posts data
  userID: String;
  posts: Array<any>;
  noPosts = false;
  // author profile
  authorName: String;
  authorProfile: any;
  
  // user in session data
  userLoggedID: any;
  userName: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((param: Params) => {
      console.log("This info was passed to Author component:", param);
      this.userID = param.id;
      this.getAllPosts(this.userID);
      this.getAuthor(this.userID);
    });
    this.userLoggedID = sessionStorage.getItem("User");
    this.userName = sessionStorage.getItem("UserName");
  }

  getAllPosts(id) {
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

  getAuthor(id) {
    let tempObservable = this._httpService.getUserbyId(id);
    tempObservable.subscribe(data => {
      console.log("GOT User USERDASHprofile COMPONENT!", data);
      this.authorName = data["name"];
      this.authorProfile = data['userprofile'][0];
    });
  }

}
