import firebase from "firebase/app";
import { AddableObject, Decode, Encode, ObjectUid, QueryKey } from "./types";
import { Query } from "./query";
export declare class Collection<ObjectValue extends ObjectUid> {
    db: firebase.firestore.Firestore;
    collectionRef: firebase.firestore.CollectionReference;
    private converter;
    constructor(db: firebase.firestore.Firestore, collectionPath: string, encode?: Encode<ObjectValue>, decode?: Decode<ObjectValue>);
    doc(id?: string): firebase.firestore.DocumentReference;
    fetchByDocId(id: string): Promise<ObjectValue | undefined>;
    fetchAll(): Promise<ObjectValue[] | undefined>;
    add(obj: AddableObject<ObjectValue>): Promise<string>;
    set(obj: AddableObject<ObjectValue> | ObjectValue): Promise<string>;
    update(obj: ObjectValue): Promise<string>;
    delete(uid: string): Promise<string>;
    where(fieldPath: QueryKey<ObjectValue>, opStr: firebase.firestore.WhereFilterOp, value: any): Query<ObjectValue>;
    orderBy(fieldPath: QueryKey<ObjectValue>, directionStr?: firebase.firestore.OrderByDirection): Query<ObjectValue>;
    limit(limit: number): Query<ObjectValue>;
    onSnapshot(callback: (querySnapshot: firebase.firestore.QuerySnapshot, decode: (documentSnapshot: firebase.firestore.DocumentSnapshot) => ObjectValue) => void): void;
}
