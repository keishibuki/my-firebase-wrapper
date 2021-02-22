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
