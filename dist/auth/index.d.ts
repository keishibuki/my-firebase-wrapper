import firebase from "firebase";
export declare type FirebaseAuthError = firebase.auth.Error | firebase.auth.AuthError;
export declare class FirebaseAuthWrapper {
    private auth;
    constructor(auth: firebase.auth.Auth);
    signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential | FirebaseAuthError>;
    createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential | FirebaseAuthError>;
    onAuthStateChanged(callback: (user: firebase.User | null) => void): firebase.Unsubscribe;
    translateErrorMessage(error: FirebaseAuthError): FirebaseAuthError;
}
