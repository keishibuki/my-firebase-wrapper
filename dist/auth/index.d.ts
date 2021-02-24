import firebase from "firebase";
export declare type FirebaseAuthError = firebase.auth.Error | firebase.auth.AuthError;
export declare class FirebaseAuthWrapper {
    private auth;
    constructor(auth: firebase.auth.Auth);
    signInWithEmailAndPassword(email: string, password: string): Promise<unknown>;
    createUserWithEmailAndPassword(email: string, password: string): Promise<unknown>;
    onAuthStateChanged(callback: (user: firebase.User | null) => void): firebase.Unsubscribe;
    translateErrorMessage(error: FirebaseAuthError): FirebaseAuthError;
}
