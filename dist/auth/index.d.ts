import firebase from "firebase";
export declare type FirebaseAuthError = firebase.auth.Error | firebase.auth.AuthError;
export declare class FirebaseAuthWrapper {
    private auth;
    constructor(auth: firebase.auth.Auth);
    getCurrentUser(): firebase.User | null;
    signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential | FirebaseAuthError>;
    signOut(): Promise<unknown>;
    sendPasswordResetEmail(email: string): Promise<string | FirebaseAuthError>;
    reauthenticateWithCredential(currentPassword: string): Promise<string | undefined>;
    createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential | FirebaseAuthError>;
    updatePassword(newPassword: string): Promise<string | FirebaseAuthError>;
    updateEmail(newEmail: string): Promise<string | FirebaseAuthError>;
    onAuthStateChanged(): Promise<firebase.User | null>;
    translateErrorMessage(error: FirebaseAuthError): FirebaseAuthError;
}
