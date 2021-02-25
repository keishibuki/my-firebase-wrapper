"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreWrapper = void 0;
var collection_1 = require("./collection");
var FirestoreWrapper = /** @class */ (function () {
    function FirestoreWrapper(db) {
        this.db = db;
        this.db = db;
    }
    FirestoreWrapper.prototype.collection = function (_a) {
        var collectionPath = _a.collectionPath, encode = _a.encode, decode = _a.decode;
        return new collection_1.Collection(this.db, collectionPath, encode, decode);
    };
    return FirestoreWrapper;
}());
exports.FirestoreWrapper = FirestoreWrapper;
//# sourceMappingURL=index.js.map