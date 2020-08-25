import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "../http.service";

@Component({
  selector: "ngbd-modal-confirm-autofocus",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Blog Post Deletion</h4>
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
        Are you sure you want to delete this post: <br />
        <br />
        <strong>"{{ title }}"? </strong>
      </p>
      <p>
        All information associated to this post will be permanently deleted.
        <span class="text-danger">This operation can not be undone.</span>
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
export class NgbdModalConfirmAutofocus {
  @Input() blogselectedID: any;
  @Input() authorID: any;
  @Input() title: String;
  @Output() clickevent = new EventEmitter<string>();

  constructor(
    public modal: NgbActiveModal,
    private _httpService: HttpService,
  ) {}

  close() {
    console.log("Close clicked", this.blogselectedID);
    let tempObservable = this._httpService.delete(this.blogselectedID);
    tempObservable.subscribe(data => {
      console.log("Deleted Post", data);
      this.clickevent.emit("true");
      this.modal.close("autofocus");
    });
  }
}

const MODALS = {
  autofocus: NgbdModalConfirmAutofocus
};

// Main MODAL Component-------------------
@Component({
  selector: "app-ngbd-modal-focus",
  templateUrl: "./ngbd-modal-focus.component.html",
  styleUrls: ["./ngbd-modal-focus.component.css"]
})
export class NgbdModalFocusComponent {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
  (click)="modal.close('Ok click')">Ok</button>`;

  @Input() selectedID: any;
  @Input() author: any;
  @Input() blogTitle: any;
  @Output() myEvent = new EventEmitter<string>();

  constructor(private _modalService: NgbModal) {}

  open(name: string) {
    console.log("selectedId,", this.selectedID);
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.componentInstance.blogselectedID = this.selectedID;
    modalRef.componentInstance.authorID = this.author;
    modalRef.componentInstance.title = this.blogTitle;
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
