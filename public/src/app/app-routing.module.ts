import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AuthorComponent } from './author/author.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserdashprofileComponent } from './userdashprofile/userdashprofile.component';
import { UserdashAllpostsComponent } from './userdash-allposts/userdash-allposts.component';
import { NgbdModalFocusComponent } from './ngbd-modal-focus/ngbd-modal-focus.component';
import { NgbdModalConfirmAutofocus } from './ngbd-modal-focus/ngbd-modal-focus.component';
import { UserdashfavComponent } from './userdashfav/userdashfav.component';
import { UserdashanalyticsComponent } from './userdashanalytics/userdashanalytics.component';
import { PostComponent } from './post/post.component';
import { PosttextComponent } from './posttext/posttext.component';
import { NewpostComponent } from './newpost/newpost.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

const routes: Routes = [
  { path: 'home', component: MainComponent, children: [
    { path: 'search', component: SearchResultsComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'author/:id', component: AuthorComponent },
  { path: 'allPosts', component: AllArticlesComponent},
  { path: 'post/:id', component: PostComponent, children: [
    {path: 'posttext', component: PosttextComponent},
  ]},

  { path: 'userdash/:id', component: UserdashboardComponent, children: [
    { path: '', redirectTo: 'detail', pathMatch: 'full' },
    { path: 'updateprofile', component: UpdateprofileComponent }, 
    { path: 'userprofile/:id', component: UserdashprofileComponent }, 
    { path: 'userdash-allposts/:id', component: UserdashAllpostsComponent, children: [
      { path: 'modal', component: NgbdModalFocusComponent, children: [
        { path: 'modalChild', component: NgbdModalConfirmAutofocus },
      ]},
    ]},
    { path: 'editPost/:id', component: UpdatepostComponent },
    { path: 'userfav', component: UserdashfavComponent },
    { path: 'useranalytics', component: UserdashanalyticsComponent },
    { path: 'new/:id', component: NewpostComponent },
  ]  },  
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
