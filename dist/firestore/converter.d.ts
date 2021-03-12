import firebase from "firebase/app";
import { AddableObject, Decode, Encode, ObjectUid } from "./types";
export declare class Converter<ObjectValue extends ObjectUid> {
    private _encode?;
    private _decode?;
    constructor({ encode, decode, }: {
        encode?: Encode<ObjectValue>;
        decode?: Decode<ObjectValue>;
    });
    decode(documentSnapshot: firebase.firestore.DocumentSnapshot<ObjectValue> | firebase.firestore.QueryDocumentSnapshot<ObjectValue>): ObjectValue;
    encode(obj: AddableObject<ObjectValue>): ObjectValue;
}
