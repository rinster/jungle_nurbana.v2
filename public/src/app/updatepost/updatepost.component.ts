import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: "app-updatepost",
  templateUrl: "./updatepost.component.html",
  styleUrls: ["./updatepost.component.css"]
})
export class UpdatepostComponent implements OnInit {
  blogID: String;
  editPost: any;

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
      console.log("This info was passed to EditPOST component:", param);
      console.log("Blog ID", param.id);
      this.blogID = param.id;
      this.getBlog(this.blogID);
    });
    this.editPost = {
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
  }

  getBlog(id) {
    let tempObservable = this._httpService.getPostById(id);
    tempObservable.subscribe(data => {
      console.log("Got blog", data["post"]);
      this.editPost = data["post"][0];
    });
  }

  edit() {
    let tempObservable = this._httpService.editPostById(this.editPost);
    tempObservable.subscribe(data => {
      console.log("Edited post", data);
    });
    this._router.navigate(["/userdash/",this.editPost["author"],"userdash-allposts", this.editPost["author"]]);
  }

  cancel() {
    this._router.navigate([
      "/userdash/",
      this.editPost["author"],
      "userdash-allposts", 
      this.editPost["author"]
    ]);
  }
}
