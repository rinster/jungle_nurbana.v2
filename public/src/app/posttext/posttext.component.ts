import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-posttext",
  templateUrl: "./posttext.component.html",
  styleUrls: ["./posttext.component.css"]
})
export class PosttextComponent implements OnInit {
  @Input() postText: any;

  constructor() {}

  ngOnInit() {}
}
