import firebase from 'firebase/app';
import { ObjectUid, QueryKey } from './types';
import { Converter } from './converter';

export class Query<ObjectValue extends ObjectUid> {
  constructor(public query: firebase.firestore.Query, public converter: Converter<ObjectValue>) {
    this.query = query;
    this.converter = converter;
  }

  where(fieldPath: QueryKey<ObjectValue>, opStr: firebase.firestore.WhereFilterOp, value: any) {
    this.query = this.query.where(fieldPath as string | firebase.firestore.FieldPath, opStr, value);

    return this;
  }

  orderBy(fieldPath: QueryKey<ObjectValue>, directionStr?: firebase.firestore.OrderByDirection) {
    this.query = this.query.orderBy(fieldPath as string | firebase.firestore.FieldPath, directionStr);

    return this;
  }

  limit(limit: number) {
    this.query = this.query.limit(limit);

    return this;
  }

  async fetch(): Promise<ObjectValue[]> {
    const snapshot = await this.query.get();

    return snapshot.docs.map((documentSnapshot) => this.converter.decode(documentSnapshot));
  }

  onSnapshot(
    callback: (
      querySnapshot: firebase.firestore.QuerySnapshot,
      decode: (documentSnapshot: firebase.firestore.DocumentSnapshot) => ObjectValue,
    ) => void,
  ) {
    this.query.onSnapshot((querySnapshot) => {
      callback(querySnapshot, this.converter.decode);
    });
  }
}
