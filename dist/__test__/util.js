"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebFirestoreTestUtil = exports.FieldValue = void 0;
const child_process_1 = require("child_process");
const rules_unit_testing_1 = require("@firebase/rules-unit-testing");
const crypto_1 = __importDefault(require("crypto"));
exports.FieldValue = rules_unit_testing_1.firestore.FieldValue;
const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST;
class WebFirestoreTestUtil {
    constructor(uid) {
        // Use random projectId to separate emulator firestore namespace for concurrent testing
        const randomStr = crypto_1.default.randomBytes(10).toString("hex");
        this.projectId = `test-${randomStr}`;
        // Setup web Firestore and admin Firestore with using emulator
        this.db = rules_unit_testing_1.initializeTestApp({
            projectId: this.projectId,
            auth: uid ? { uid } : undefined,
        }).firestore();
    }
    // Clear emulator Firestore data
    // Use in 'afterEach'
    async clearFirestoreData() {
        await rules_unit_testing_1.clearFirestoreData({ projectId: this.projectId });
    }
    // Delete firebase listner
    // Use in 'afterAll'
    async deleteApps() {
        await Promise.all(rules_unit_testing_1.apps().map((app) => app.delete()));
    }
    async importToEmulator(fsPath, collectionPath, projectId) {
        const restoreCmd = `FIRESTORE_EMULATOR_HOST=${emulatorHost} fsrpl restore --path "${fsPath}" "${collectionPath}/*" --debug --emulators-project-id=${projectId}`;
        console.log(`restore: ${restoreCmd}`);
        const stdout = await child_process_1.execSync(`${restoreCmd}`);
        console.log(`imported test data: ${stdout.toString()}`);
    }
}
exports.WebFirestoreTestUtil = WebFirestoreTestUtil;
//# sourceMappingURL=util.js.map