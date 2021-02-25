import firebase from "firebase";
export declare type FirebaseAuthError = firebase.auth.Error | firebase.auth.AuthError;
export declare class FirebaseAuthWrapper {
    private auth;
    constructor(auth: firebase.auth.Auth);
    signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential | FirebaseAuthError>;
    signOut(): Promise<unknown>;
    sendPasswordResetEmail(email: string): Promise<string | FirebaseAuthError>;
    createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential | FirebaseAuthError>;
    onAuthStateChanged(): Promise<firebase.User | null>;
    translateErrorMessage(error: FirebaseAuthError): FirebaseAuthError;
}
