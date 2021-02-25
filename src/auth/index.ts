import firebase from "firebase";

import errorMessages from "./error/ja.json";

export type FirebaseAuthError = firebase.auth.Error | firebase.auth.AuthError;

export class FirebaseAuthWrapper {
  private auth: firebase.auth.Auth;

  constructor(auth: firebase.auth.Auth) {
    this.auth = auth;
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential | FirebaseAuthError> {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential: firebase.auth.UserCredential) => {
          if (!userCredential.user) {
            throw userCredential;
          }

          resolve(userCredential);
        })
        .catch((error: FirebaseAuthError) => {
          reject(this.translateErrorMessage(error));
        });
    });
  }

  sendPasswordResetEmail(email: string): Promise<string | FirebaseAuthError> {
    return new Promise((resolve, reject) => {
      this.auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(email);
        })
        .catch((error: FirebaseAuthError) => {
          reject(this.translateErrorMessage(error));
        });
    });
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential | FirebaseAuthError> {
    return new Promise((resolve, reject) => {
      this
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential: firebase.auth.UserCredential) => {
          if (!userCredential.user) {
            throw userCredential;
          }

          resolve(userCredential);
        })
        .catch((error: FirebaseAuthError) => {
          reject(this.translateErrorMessage(error));
        });
    });
  }

  onAuthStateChanged(): Promise<firebase.User | null> {
   return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (!user) reject(user);

        resolve(user);
      })
    });
  }

  public translateErrorMessage(error: FirebaseAuthError) {
    const messages = errorMessages as { [k: string]: string };
    if (error.code in messages) {
      error.message = messages[error.code];
      return error;
    } else {
      return error;
    }
  }
}
