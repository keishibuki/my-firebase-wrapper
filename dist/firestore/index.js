"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreWrapper = void 0;
const collection_1 = require("./collection");
class FirestoreWrapper {
    constructor(db) {
        this.db = db;
        this.db = db;
    }
    collection({ collectionPath, encode, decode, }) {
        return new collection_1.Collection(this.db, collectionPath, encode, decode);
    }
}
exports.FirestoreWrapper = FirestoreWrapper;
//# sourceMappingURL=index.js.map