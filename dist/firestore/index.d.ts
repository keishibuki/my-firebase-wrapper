import firebase from "firebase";
import { Decode, Encode, ObjectUid } from "./types";
import { Collection } from "./collection";
export declare class FirestoreWrapper {
    private db;
    constructor(db: firebase.firestore.Firestore);
    collection<ObjectValue extends ObjectUid>({ collectionPath, encode, decode, }: {
        collectionPath: string;
        encode?: Encode<ObjectValue>;
        decode?: Decode<ObjectValue>;
    }): Collection<ObjectValue>;
}
