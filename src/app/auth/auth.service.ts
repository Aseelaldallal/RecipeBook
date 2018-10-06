import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: String;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => console.log("ERROR: ", error));
  }

  signInUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        this.token = await firebase.auth().currentUser.getIdToken();
        this.router.navigate(["/"]);
      })
      .catch(error => console.log(error));
  }

  async getToken() {
    return await firebase.auth().currentUser.getIdToken();
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  isAuthenticated() {
    return this.token !== null;
  }
}
