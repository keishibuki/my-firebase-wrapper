import firebase from "firebase/app";
import { Optional } from "utility-types";
export declare type ObjectUid = {
    uid: string;
};
export declare type AddableObject<ObjectValue extends ObjectUid> = Optional<ObjectValue, "uid">;
export declare type QueryKey<ObjectValue extends ObjectUid> = {
    [K in keyof ObjectValue]: K;
}[keyof ObjectValue] | firebase.firestore.FieldPath;
export declare type Encode<ObjectValue extends ObjectUid> = (obj: AddableObject<ObjectValue>) => ObjectValue;
export declare type Decode<ObjectValue extends ObjectUid> = (doc: firebase.firestore.DocumentSnapshot<ObjectValue>) => ObjectValue;
export interface Where<ObjectValue extends ObjectUid> {
    fieldPath: QueryKey<ObjectValue>;
    opStr: firebase.firestore.WhereFilterOp;
    value: any;
}
export declare type WhereQueries<ObjectValue extends ObjectUid> = Where<ObjectValue>[];
export interface Order<ObjectValue extends ObjectUid> {
    fieldPath: QueryKey<ObjectValue>;
    directionStr?: firebase.firestore.OrderByDirection;
}
export declare type OrderQueries<ObjectValue extends ObjectUid> = Order<ObjectValue>[];
