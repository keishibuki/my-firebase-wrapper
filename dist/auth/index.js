"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthWrapper = void 0;
const ja_json_1 = __importDefault(require("./error/ja.json"));
class FirebaseAuthWrapper {
    constructor(auth) {
        this.auth = auth;
    }
    signInWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            this.auth
                .signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                if (!userCredential.user) {
                    throw userCredential;
                }
                resolve(userCredential);
            })
                .catch((error) => {
                reject(this.translateErrorMessage(error));
            });
        });
    }
    createUserWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            this
                .auth
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                if (!userCredential.user) {
                    throw userCredential;
                }
                resolve(userCredential);
            })
                .catch((error) => {
                reject(this.translateErrorMessage(error));
            });
        });
    }
    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged((user) => {
            callback(user);
        });
    }
    translateErrorMessage(error) {
        const messages = ja_json_1.default;
        if (error.code in messages) {
            error.message = messages[error.code];
            return error;
        }
        else {
            return error;
        }
    }
}
exports.FirebaseAuthWrapper = FirebaseAuthWrapper;
//# sourceMappingURL=index.js.map