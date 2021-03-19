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
var util_1 = require("./util");
var firestore_1 = require("../firestore");
process.env.FIRESTORE_EMULATOR_HOST = "localhost:58080";
var util = new util_1.WebFirestoreTestUtil("test-user");
var projectId = util.projectId;
var db = util.db;
var firestoreWrapper = new firestore_1.FirestoreWrapper(db);
/**  * @jest-environment node  */
describe("Basic", function () {
    var testCollectionPath = "test-collection";
    var existsDocId = "test-doc";
    var existsDoc = { uid: existsDocId, name: "test", num: 10 };
    var collection = firestoreWrapper.collection({
        collectionPath: testCollectionPath,
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util.importToEmulator("./src/__test__/testData/" + testCollectionPath + "/", testCollectionPath, projectId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util.deleteApps()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util.clearFirestoreData()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("fetch", function () {
        it("exists document", function () { return __awaiter(void 0, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.fetchByDocId(existsDocId)];
                    case 1:
                        doc = _a.sent();
                        expect(doc).toEqual(existsDoc);
                        return [2 /*return*/];
                }
            });
        }); });
        it("does not exist document", function () { return __awaiter(void 0, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.fetchByDocId("not_exists_document_id")];
                    case 1:
                        doc = _a.sent();
                        expect(doc).toEqual(undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it("fetchAll", function () { return __awaiter(void 0, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.fetchAll()];
                    case 1:
                        docs = _a.sent();
                        expect(docs === null || docs === void 0 ? void 0 : docs.length).toBeGreaterThanOrEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("create/update", function () {
        it("add", function () { return __awaiter(void 0, void 0, void 0, function () {
            var doc, addedId, fetchedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = {
                            name: "add",
                            num: 10,
                        };
                        return [4 /*yield*/, collection.add(doc)];
                    case 1:
                        addedId = _a.sent();
                        return [4 /*yield*/, collection.fetchByDocId(addedId)];
                    case 2:
                        fetchedDoc = _a.sent();
                        expect(fetchedDoc).toEqual({
                            uid: addedId,
                            name: doc.name,
                            num: doc.num,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("set", function () { return __awaiter(void 0, void 0, void 0, function () {
            var addedId, setDoc, setedId, fetchedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.add({
                            name: "hogehoge",
                            num: 10,
                        })];
                    case 1:
                        addedId = _a.sent();
                        setDoc = {
                            uid: addedId,
                            name: "set",
                            num: 20,
                        };
                        return [4 /*yield*/, collection.set(setDoc)];
                    case 2:
                        setedId = _a.sent();
                        return [4 /*yield*/, collection.fetchByDocId(setedId)];
                    case 3:
                        fetchedDoc = _a.sent();
                        expect(fetchedDoc).toEqual(setDoc);
                        return [2 /*return*/];
                }
            });
        }); });
        it("update", function () { return __awaiter(void 0, void 0, void 0, function () {
            var addedId, setDoc, setedId, fetchedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.add({
                            name: "hogehoge",
                            num: 10,
                        })];
                    case 1:
                        addedId = _a.sent();
                        setDoc = {
                            uid: addedId,
                            name: "set",
                            num: 20,
                        };
                        return [4 /*yield*/, collection.update(setDoc)];
                    case 2:
                        setedId = _a.sent();
                        return [4 /*yield*/, collection.fetchByDocId(setedId)];
                    case 3:
                        fetchedDoc = _a.sent();
                        expect(fetchedDoc).toEqual(setDoc);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it("delete", function () { return __awaiter(void 0, void 0, void 0, function () {
        var doc, addedId, snapshot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    doc = {
                        name: "delete",
                        num: 10,
                    };
                    return [4 /*yield*/, collection.add(doc)];
                case 1:
                    addedId = _a.sent();
                    return [4 /*yield*/, collection.delete(addedId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, collection.fetchByDocId(addedId)];
                case 3:
                    snapshot = _a.sent();
                    expect(snapshot).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    describe("docRef", function () {
        it("引数なしの場合、新しいドキュメントを返す必要がある", function () { return __awaiter(void 0, void 0, void 0, function () {
            var docRef, fetchedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docRef = collection.doc();
                        return [4 /*yield*/, collection.fetchByDocId(docRef.id)];
                    case 1:
                        fetchedDoc = _a.sent();
                        console.log(fetchedDoc);
                        expect(fetchedDoc).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it("引数ありの場合、存在するドキュメントを返す必要がある", function () { return __awaiter(void 0, void 0, void 0, function () {
            var docRef, fetchedDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docRef = collection.doc(existsDocId);
                        return [4 /*yield*/, collection.fetchByDocId(docRef.id)];
                    case 1:
                        fetchedDoc = _a.sent();
                        console.log(fetchedDoc);
                        expect(fetchedDoc).toEqual(existsDoc);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=basic.test.js.map