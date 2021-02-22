import { execSync } from "child_process";
import firebase from "firebase";
import {
  apps,
  firestore,
  initializeTestApp,
  clearFirestoreData,
} from "@firebase/rules-unit-testing";
import crypto from "crypto";

export const { FieldValue } = firestore;

const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST;

export class WebFirestoreTestUtil {
  projectId: string;
  db: firebase.firestore.Firestore;

  constructor(uid: string) {
    // Use random projectId to separate emulator firestore namespace for concurrent testing
    const randomStr = crypto.randomBytes(10).toString("hex");
    this.projectId = `test-${randomStr}`;

    // Setup web Firestore and admin Firestore with using emulator
    this.db = initializeTestApp({
      projectId: this.projectId,
      auth: uid ? { uid } : undefined,
    }).firestore();
  }

  // Clear emulator Firestore data
  // Use in 'afterEach'
  async clearFirestoreData() {
    await clearFirestoreData({ projectId: this.projectId });
  }

  // Delete firebase listner
  // Use in 'afterAll'
  async deleteApps() {
    await Promise.all(apps().map((app) => app.delete()));
  }

  async importToEmulator(
    fsPath: string,
    collectionPath: string,
    projectId: string
  ) {
    const restoreCmd = `FIRESTORE_EMULATOR_HOST=${emulatorHost} fsrpl restore --path "${fsPath}" "${collectionPath}/*" --debug --emulators-project-id=${projectId}`;
    console.log(`restore: ${restoreCmd}`);
    const stdout = await execSync(`${restoreCmd}`);
    console.log(`imported test data: ${stdout.toString()}`);
  }
}
