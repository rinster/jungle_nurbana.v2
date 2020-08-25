import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: "app-newpost",
  templateUrl: "./newpost.component.html",
  styleUrls: ["./newpost.component.css"]
})
export class NewpostComponent implements OnInit {
  authorID: String;
  newPost: any;

  imgIssue: String;
  locIssue: String;
  nameIssue: String;
  postIssue: String;
  titleIssue: String;
  typeIssue: String;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
  }

  ngOnInit() {
    this._route.params.subscribe((param: Params) => {
      console.log("This info was passed to ADDPOST component:", param);
      console.log("Add Post Page Received ID", param.id);
      this.authorID = param.id;
      this.newPost = {
        title: "",
        name: "",
        type: "",
        location: "",
        postText: "",
        imageUrl1: "",
        imageUrl2: "",
        imageUrl3: "",
        author: ""
      };
      this.newPost.author = this.authorID;
    });
  }

  newBlogPost() {
    console.log("Submit clicked");
    let tempObservable = this._httpService.addPost(this.newPost);
    tempObservable.subscribe(data => {
      console.log("Server Resp:", data);
      if (data["error"]) {
        let errors = data["error"]["errors"];
        console.log("errors: ", errors);
        if (errors["imageUrl1"]) {
          this.imgIssue = errors["imageUrl1"];
        }
        if (errors["location"]) {
          this.locIssue = errors["location"];
        }
        if (errors["name"]) {
          this.nameIssue = errors["name"];
        }
        if (errors["postText"]) {
          this.postIssue = errors["postText"];
        }
        if (errors["title"]) {
          this.titleIssue = errors["title"];
        }
        if (errors["type"]) {
          this.typeIssue = errors["type"];
        }
      } else {
        console.log("Posted Successfully");
        this._router.navigate([
          "/userdash/",
          this.authorID,
          "userdash-allposts",
          this.authorID
        ]);
      }
    });
  }

  cancel() {
    this._router.navigate([
      "/userdash/",
      this.authorID,
      "userdash-allposts",
      this.authorID
    ]);
  }
}
