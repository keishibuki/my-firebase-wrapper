"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
var converter_1 = require("./converter");
var query_1 = require("./query");
var Collection = /** @class */ (function () {
    function Collection(db, collectionPath, encode, decode) {
        this.db = db;
        this.collectionRef = db.collection(collectionPath);
        this.converter = new converter_1.Converter({ encode: encode, decode: decode });
        this.query = new query_1.Query({}, this.converter);
    }
    Collection.prototype.doc = function (id) {
        if (id)
            return this.collectionRef.doc(id);
        return this.collectionRef.doc();
    };
    Collection.prototype.fetch = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var docRef, snapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docRef = this.doc(id);
                        return [4 /*yield*/, docRef.get()];
                    case 1:
                        snapshot = _a.sent();
                        if (!snapshot.exists)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, this.converter.decode(snapshot)];
                }
            });
        });
    };
    Collection.prototype.fetchAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var snapshot;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collectionRef.get()];
                    case 1:
                        snapshot = _a.sent();
                        return [2 /*return*/, snapshot.size
                                ? snapshot.docs.map(function (docSnapshot) { return _this.converter.decode(docSnapshot); })
                                : undefined];
                }
            });
        });
    };
    Collection.prototype.add = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = this.converter.encode(obj);
                        return [4 /*yield*/, this.collectionRef.doc(doc.uid).set(doc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, doc.uid];
                }
            });
        });
    };
    Collection.prototype.set = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, docRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = this.converter.encode(obj);
                        docRef = this.doc(obj.uid);
                        return [4 /*yield*/, docRef.set(doc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, doc.uid];
                }
            });
        });
    };
    Collection.prototype.update = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var updateDoc, docRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateDoc = this.converter.encode(obj);
                        docRef = this.doc(obj.uid);
                        return [4 /*yield*/, docRef.update(updateDoc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, docRef.id];
                }
            });
        });
    };
    Collection.prototype.delete = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var docRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docRef = this.doc(uid);
                        return [4 /*yield*/, docRef.delete()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, uid];
                }
            });
        });
    };
    Collection.prototype.where = function (fieldPath, opStr, value) {
        var query = this.collectionRef.where(fieldPath, opStr, value);
        return new query_1.Query(query, this.converter);
    };
    Collection.prototype.orderBy = function (fieldPath, directionStr) {
        var query = this.collectionRef.orderBy(fieldPath, directionStr);
        return new query_1.Query(query, this.converter);
    };
    Collection.prototype.limit = function (limit) {
        var query = this.collectionRef.limit(limit);
        return new query_1.Query(query, this.converter);
    };
    Collection.prototype.onSnapshot = function (callback) {
        var _this = this;
        this.collectionRef.onSnapshot(function (querySnapshot) {
            callback(querySnapshot, _this.converter.decode);
        });
    };
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map