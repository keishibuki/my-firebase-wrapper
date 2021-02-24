"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
class Query {
    constructor(query, converter) {
        this.query = query;
        this.converter = converter;
        this.query = query;
        this.converter = converter;
    }
    where(fieldPath, opStr, value) {
        this.query = this.query.where(fieldPath, opStr, value);
        return this;
    }
    orderBy(fieldPath, directionStr) {
        this.query = this.query.orderBy(fieldPath, directionStr);
        return this;
    }
    limit(limit) {
        this.query = this.query.limit(limit);
        return this;
    }
    async fetch() {
        const snapshot = await this.query.get();
        return snapshot.docs.map((documentSnapshot) => this.converter.decode(documentSnapshot));
    }
    onSnapshot(callback) {
        this.query.onSnapshot((querySnapshot) => {
            callback(querySnapshot, this.converter.decode);
        });
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map