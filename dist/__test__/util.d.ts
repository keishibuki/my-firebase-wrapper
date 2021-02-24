import firebase from "firebase";
export declare const FieldValue: typeof firebase.firestore.FieldValue;
export declare class WebFirestoreTestUtil {
    projectId: string;
    db: firebase.firestore.Firestore;
    constructor(uid: string);
    clearFirestoreData(): Promise<void>;
    deleteApps(): Promise<void>;
    importToEmulator(fsPath: string, collectionPath: string, projectId: string): Promise<void>;
}
