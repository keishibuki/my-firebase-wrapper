"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const converter_1 = require("./converter");
const query_1 = require("./query");
class Collection {
    constructor(db, collectionPath, encode, decode) {
        this.db = db;
        this.collectionRef = db.collection(collectionPath);
        this.converter = new converter_1.Converter({ encode, decode });
    }
    doc(id) {
        if (id)
            return this.collectionRef.doc(id);
        return this.collectionRef.doc();
    }
    async fetch(id) {
        const docRef = this.doc(id);
        const snapshot = await docRef.get();
        if (!snapshot.exists)
            return undefined;
        return this.converter.decode(snapshot);
    }
    async fetchAll() {
        const snapshot = await this.collectionRef.get();
        return snapshot.size
            ? snapshot.docs.map((docSnapshot) => this.converter.decode(docSnapshot))
            : undefined;
    }
    async add(obj) {
        const doc = this.converter.encode(obj);
        await this.collectionRef.doc(doc.uid).set(doc);
        return doc.uid;
    }
    async set(obj) {
        const doc = this.converter.encode(obj);
        const docRef = this.doc(obj.uid);
        await docRef.set(doc);
        return doc.uid;
    }
    async update(obj) {
        const updateDoc = this.converter.encode(obj);
        const docRef = this.doc(obj.uid);
        await docRef.update(updateDoc);
        return docRef.id;
    }
    async delete(uid) {
        const docRef = this.doc(uid);
        await docRef.delete();
        return uid;
    }
    where(fieldPath, opStr, value) {
        const query = this.collectionRef.where(fieldPath, opStr, value);
        return new query_1.Query(query, this.converter);
    }
    orderBy(fieldPath, directionStr) {
        const query = this.collectionRef.orderBy(fieldPath, directionStr);
        return new query_1.Query(query, this.converter);
    }
    limit(limit) {
        const query = this.collectionRef.limit(limit);
        return new query_1.Query(query, this.converter);
    }
    onSnapshot(callback) {
        this.collectionRef.onSnapshot((querySnapshot) => {
            callback(querySnapshot, this.converter.decode);
        });
    }
}
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map