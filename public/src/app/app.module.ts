import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule }  from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ReadTimePipe } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserdashprofileComponent } from './userdashprofile/userdashprofile.component';
import { NewpostComponent } from './newpost/newpost.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { UserdashAllpostsComponent } from './userdash-allposts/userdash-allposts.component';
import { UserdashfavComponent } from './userdashfav/userdashfav.component';
import { UserdashanalyticsComponent } from './userdashanalytics/userdashanalytics.component';
import { PostComponent } from './post/post.component';
import { PosttextComponent } from './posttext/posttext.component';
import { NgbdModalFocusComponent } from './ngbd-modal-focus/ngbd-modal-focus.component';
import { NgbdModalConfirmAutofocus } from './ngbd-modal-focus/ngbd-modal-focus.component';
import { NgbdModalDeletefavoriteComponent } from './ngbd-modal-deletefavorite/ngbd-modal-deletefavorite.component';
import { NgbdModalConfirmDelete } from './ngbd-modal-deletefavorite/ngbd-modal-deletefavorite.component';
import { AuthorComponent } from './author/author.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    UserdashboardComponent,
    UserdashprofileComponent,
    NewpostComponent,
    UpdatepostComponent,
    UpdateprofileComponent,
    UserdashAllpostsComponent,
    UserdashfavComponent,
    UserdashanalyticsComponent,
    PostComponent,
    PosttextComponent,
    NgbdModalFocusComponent,
    NgbdModalConfirmAutofocus,
    ReadTimePipe,
    NgbdModalDeletefavoriteComponent,
    NgbdModalConfirmDelete,
    AuthorComponent,
    AllArticlesComponent,
    SearchResultsComponent, 
  ],
  entryComponents: [
    NgbdModalConfirmAutofocus,
    NgbdModalConfirmDelete, 
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgbModule,
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
