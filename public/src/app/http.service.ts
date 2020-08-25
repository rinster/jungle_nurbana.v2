import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  // // // USER DATA----------------------------
  registerUser(data) {
    return this._http.post("/signup", data);
  }
  login(data) {
    return this._http.post("/session", data);
  }
  logout() {
    return this._http.post("/clear", null);
  }
  getUserbyId(id) {
    return this._http.get("/retrieve/" + id);
  }
  editProfile(profileData, id) {
    return this._http.post("/editProfile/" + id,  profileData);
  }

   // // // POSTS DATA----------------------------
  addPost(data) {
    return this._http.post("/new", data);
  }
  getallPosts() {
    return this._http.get("/getAll");
  }
  getPosts(id) {
    return this._http.get("/getAllPosts/" + id);
  }
  getPostById(id) {
    return this._http.get("/getPost/" + id);
  }
  editPostById(post) {
    return this._http.put("/updatePost/" + post._id, post);
  }

   // // // LIKES DATA----------------------------
  newLike(data) {
    return this._http.put("/addlike", data);
  }
  getFavs(id) {
    return this._http.get("/getLikes/" + id);
  }
  getfavposts(ids) {
    return this._http.post("/favBlogs", { ids: ids });
  }
  checkForFavorite(data) {
    return this._http.post("/getFavorite", data);
  }

   // // // DELETE ROUTING----------------------------
  deleteLike(id) {
    return this._http.delete("/removeFavorite/"+ id);
  }
  delete(id) {
    return this._http.delete("/delete/" + id);
  }
}
