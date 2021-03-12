import firebase from "firebase/app";

import { AddableObject, Decode, Encode, ObjectUid, QueryKey } from "./types";
import { Converter } from "./converter";
import { Query } from "./query";

export class Collection<ObjectValue extends ObjectUid> {
  public db: firebase.firestore.Firestore;
  public collectionRef: firebase.firestore.CollectionReference<ObjectValue>;
  private converter: Converter<ObjectValue>;

  constructor(
    db: firebase.firestore.Firestore,
    collectionPath: string,
    encode?: Encode<ObjectValue>,
    decode?: Decode<ObjectValue>
  ) {
    this.db = db;
    this.collectionRef = db.collection(collectionPath) as firebase.firestore.CollectionReference<ObjectValue>;
    this.converter = new Converter<ObjectValue>({ encode, decode });
  }

  doc(id?: string): firebase.firestore.DocumentReference<ObjectValue> {
    if (id) return this.collectionRef.doc(id);

    return this.collectionRef.doc();
  }

  async fetchByDocId(id: string): Promise<ObjectValue | undefined> {
    const docRef = this.doc(id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) return undefined;

    return this.converter.decode(snapshot);
  }

  async fetchAll(): Promise<ObjectValue[] | undefined> {
    const snapshot = await this.collectionRef.get();

    return snapshot.size
      ? snapshot.docs.map((docSnapshot) => this.converter.decode(docSnapshot))
      : undefined;
  }

  async add(obj: AddableObject<ObjectValue>): Promise<string> {
    const doc = this.converter.encode(obj);
    await this.collectionRef.doc(doc.uid).set(doc);

    return doc.uid;
  }

  async set(obj: AddableObject<ObjectValue> | ObjectValue) {
    const doc = this.converter.encode(obj);
    const docRef = this.doc(obj.uid);
    await docRef.set(doc);

    return doc.uid;
  }

  async update(obj: ObjectValue): Promise<string> {
    const updateDoc = this.converter.encode(obj);
    const docRef = this.doc(obj.uid);
    await docRef.update(updateDoc);

    return docRef.id;
  }

  async delete(uid: string): Promise<string> {
    const docRef = this.doc(uid);
    await docRef.delete();

    return uid;
  }

  where(
    fieldPath: QueryKey<ObjectValue>,
    opStr: firebase.firestore.WhereFilterOp,
    value: any
  ): Query<ObjectValue> {
    const query = this.collectionRef.where(fieldPath as string, opStr, value);

    return new Query(query, this.converter);
  }

  orderBy(
    fieldPath: QueryKey<ObjectValue>,
    directionStr?: firebase.firestore.OrderByDirection
  ): Query<ObjectValue> {
    const query = this.collectionRef.orderBy(
      fieldPath as string | firebase.firestore.FieldPath,
      directionStr
    );

    return new Query(query, this.converter);
  }

  limit(limit: number): Query<ObjectValue> {
    const query = this.collectionRef.limit(limit);

    return new Query(query, this.converter);
  }

  onSnapshot(
    callback: (
      querySnapshot: firebase.firestore.QuerySnapshot,
      decode: (documentSnapshot: firebase.firestore.DocumentSnapshot<ObjectValue> | firebase.firestore.QueryDocumentSnapshot<ObjectValue>) => ObjectValue,
    ) => void
  ) {
    this.collectionRef.onSnapshot((querySnapshot) => {
      callback(querySnapshot, this.converter.decode);
    });
  }
}
