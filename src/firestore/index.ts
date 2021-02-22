import firebase from "firebase";

import { Decode, Encode, ObjectUid } from "./types";
import { Collection } from "./collection";

export class FirestoreWrapper {
  constructor(private db: firebase.firestore.Firestore) {
    this.db = db;
  }

  collection<ObjectValue extends ObjectUid>({
    collectionPath,
    encode,
    decode,
  }: {
    collectionPath: string;
    encode?: Encode<ObjectValue>;
    decode?: Decode<ObjectValue>;
  }) {
    return new Collection(this.db, collectionPath, encode, decode);
  }
}
