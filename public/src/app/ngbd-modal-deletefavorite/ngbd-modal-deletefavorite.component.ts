import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "../http.service";

@Component({
  selector: "ngbd-modal-confirm-delete",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Remove from your favorites?</h4>
      <button
        type="button"
        class="close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong>"{{ title }}"? </strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-danger"
        (click)="close()"
      >
        Yes, I confirm
      </button>
    </div>
  `
})
export class NgbdModalConfirmDelete implements OnInit {
  @Input() blogselectedID: String;
  @Input() title: String;
  @Input() userId: String;
  @Output() clickevent = new EventEmitter<string>();

  fav: any;
  favDocId: String;

  constructor(
    public modal: NgbActiveModal,
    private _httpService: HttpService,
  ) {}

  ngOnInit() {
    this.fav = {
      favPostId: this.blogselectedID,
      favoriterId: this.userId
    };
    this.getFavId(this.fav)
  }

  getFavId(fav) {
    console.log("Checking for favorite...")
    let tempObservable = this._httpService.checkForFavorite(fav);
    tempObservable.subscribe(data => {
      console.log("Favorite Query Response", data);
      if(data['favorite'].length == 1) {
        this.favDocId= data['favorite'][0]['_id']
        console.log("Got favpostID:", this.favDocId)
      } else {
        console.log("No favorite document was found")
      }
    });
  }

  close() {
    console.log("Deleting Favorite");
    let tempObservable = this._httpService.deleteLike(this.blogselectedID);
    tempObservable.subscribe(data => {
      console.log("Deleted Favorite", data);
      this.clickevent.emit("true");
      this.modal.close("autofocus");
    });
  }
}


const MODALS = {
  autofocus: NgbdModalConfirmDelete
};

@Component({
  selector: 'app-ngbd-modal-deletefavorite',
  templateUrl: './ngbd-modal-deletefavorite.component.html',
  styleUrls: ['./ngbd-modal-deletefavorite.component.css']
})
export class NgbdModalDeletefavoriteComponent {
  @Input() post: any;
  @Input() userId: String;
  @Output() myEvent = new EventEmitter<string>();

  favDocId: String;

  constructor(
    private _modalService: NgbModal,
    ) { }

  open(name: string) {
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.componentInstance.title = this.post.title;
    modalRef.componentInstance.blogselectedID = this.favDocId;
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.clickevent.subscribe($e => {
      console.log("Parent modal received output", $e);
      if ($e == "true") {
        this.myEvent.emit("true");
        console.log("My event emitted");
      }
    }
    );
  }
  
}
