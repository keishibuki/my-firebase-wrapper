"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const firestore_1 = require("../firestore");
process.env.FIRESTORE_EMULATOR_HOST = "localhost:58080";
const util = new util_1.WebFirestoreTestUtil("test-user");
const projectId = util.projectId;
const db = util.db;
const firestoreWrapper = new firestore_1.FirestoreWrapper(db);
/**  * @jest-environment node  */
describe("Basic", () => {
    const testCollectionPath = "test-collection";
    const existsDocId = "test-doc";
    const existsDoc = { uid: existsDocId, name: "test", num: 10 };
    const collection = firestoreWrapper.collection({
        collectionPath: testCollectionPath,
    });
    beforeEach(async () => {
        await util.importToEmulator(`./src/__test__/testData/${testCollectionPath}/`, testCollectionPath, projectId);
    });
    afterAll(async () => {
        await util.deleteApps();
    });
    afterEach(async () => {
        await util.clearFirestoreData();
    });
    describe("fetch", () => {
        it("exists document", async () => {
            const doc = await collection.fetch(existsDocId);
            expect(doc).toEqual(existsDoc);
        });
        it("does not exist document", async () => {
            const doc = await collection.fetch("not_exists_document_id");
            expect(doc).toEqual(undefined);
        });
        it("fetchAll", async () => {
            const docs = await collection.fetchAll();
            expect(docs?.length).toBeGreaterThanOrEqual(2);
        });
    });
    describe("create/update", () => {
        it("add", async () => {
            const doc = {
                name: "add",
                num: 10,
            };
            const addedId = await collection.add(doc);
            const fetchedDoc = await collection.fetch(addedId);
            expect(fetchedDoc).toEqual({
                uid: addedId,
                name: doc.name,
                num: doc.num,
            });
        });
        it("set", async () => {
            const addedId = await collection.add({
                name: "hogehoge",
                num: 10,
            });
            const setDoc = {
                uid: addedId,
                name: "set",
                num: 20,
            };
            const setedId = await collection.set(setDoc);
            const fetchedDoc = await collection.fetch(setedId);
            expect(fetchedDoc).toEqual(setDoc);
        });
        it("update", async () => {
            const addedId = await collection.add({
                name: "hogehoge",
                num: 10,
            });
            const setDoc = {
                uid: addedId,
                name: "set",
                num: 20,
            };
            const setedId = await collection.update(setDoc);
            const fetchedDoc = await collection.fetch(setedId);
            expect(fetchedDoc).toEqual(setDoc);
        });
    });
    it("delete", async () => {
        const doc = {
            name: "delete",
            num: 10,
        };
        const addedId = await collection.add(doc);
        await collection.delete(addedId);
        const snapshot = await collection.fetch(addedId);
        expect(snapshot).toBe(undefined);
    });
    describe("docRef", () => {
        it("引数なしの場合、新しいドキュメントを返す必要がある", async () => {
            const docRef = collection.doc();
            const fetchedDoc = await collection.fetch(docRef.id);
            console.log(fetchedDoc);
            expect(fetchedDoc).toBeUndefined();
        });
        it("引数ありの場合、存在するドキュメントを返す必要がある", async () => {
            const docRef = collection.doc(existsDocId);
            const fetchedDoc = await collection.fetch(docRef.id);
            console.log(fetchedDoc);
            expect(fetchedDoc).toEqual(existsDoc);
        });
    });
});
//# sourceMappingURL=basic.test.js.map