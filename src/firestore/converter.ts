import firebase from "firebase/app";
import { v4 } from "uuid";

import { AddableObject, Decode, Encode, ObjectUid } from "./types";

export class Converter<ObjectValue extends ObjectUid> {
  private _encode?: Encode<ObjectValue>;
  private _decode?: Decode<ObjectValue>;

  constructor({
    encode,
    decode,
  }: {
    encode?: Encode<ObjectValue>;
    decode?: Decode<ObjectValue>;
  }) {
    this._encode = encode;
    this._decode = decode;
  }

  decode(documentSnapshot: firebase.firestore.DocumentSnapshot<ObjectValue> | firebase.firestore.QueryDocumentSnapshot<ObjectValue>) {
    if (this._decode) return this._decode(documentSnapshot);

    const obj = { ...documentSnapshot.data() };

    return obj as ObjectValue;
  }

  encode(obj: AddableObject<ObjectValue>): ObjectValue {
    if (this._encode) return this._encode(obj);

    return (obj?.uid ? obj : { ...obj, uid: v4() }) as ObjectValue;
  }
}
