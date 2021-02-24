import firebase from 'firebase/app';
import { ObjectUid, QueryKey } from './types';
import { Converter } from './converter';
export declare class Query<ObjectValue extends ObjectUid> {
    query: firebase.firestore.Query;
    converter: Converter<ObjectValue>;
    constructor(query: firebase.firestore.Query, converter: Converter<ObjectValue>);
    where(fieldPath: QueryKey<ObjectValue>, opStr: firebase.firestore.WhereFilterOp, value: any): this;
    orderBy(fieldPath: QueryKey<ObjectValue>, directionStr?: firebase.firestore.OrderByDirection): this;
    limit(limit: number): this;
    fetch(): Promise<ObjectValue[]>;
    onSnapshot(callback: (querySnapshot: firebase.firestore.QuerySnapshot, decode: (documentSnapshot: firebase.firestore.DocumentSnapshot) => ObjectValue) => void): void;
}
