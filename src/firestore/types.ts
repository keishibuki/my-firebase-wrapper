import firebase from "firebase/app";
import { Optional } from "utility-types";

export type ObjectUid = { uid: string };

export type AddableObject<ObjectValue extends ObjectUid> = Optional<
  ObjectValue,
  "uid"
>;

export type QueryKey<ObjectValue extends ObjectUid> =
  | { [K in keyof ObjectValue]: K }[keyof ObjectValue]
  | firebase.firestore.FieldPath;

export type Encode<ObjectValue extends ObjectUid> = (
  obj: AddableObject<ObjectValue>
) => ObjectValue;

export type Decode<ObjectValue extends ObjectUid> = (
  doc: firebase.firestore.DocumentSnapshot
) => ObjectValue;

export interface Where<ObjectValue extends ObjectUid> {
  fieldPath: QueryKey<ObjectValue>;
  opStr: firebase.firestore.WhereFilterOp;
  value: any;
}

export type WhereQueries<ObjectValue extends ObjectUid> = Where<ObjectValue>[];

export interface Order<ObjectValue extends ObjectUid> {
  fieldPath: QueryKey<ObjectValue>;
  directionStr?: firebase.firestore.OrderByDirection
}

export type OrderQueries<ObjectValue extends ObjectUid> = Order<ObjectValue>[];
