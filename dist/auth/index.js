"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthWrapper = void 0;
var ja_json_1 = __importDefault(require("./error/ja.json"));
var FirebaseAuthWrapper = /** @class */ (function () {
    function FirebaseAuthWrapper(auth) {
        this.auth = auth;
    }
    FirebaseAuthWrapper.prototype.signInWithEmailAndPassword = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth
                .signInWithEmailAndPassword(email, password)
                .then(function (userCredential) {
                if (!userCredential.user) {
                    throw userCredential;
                }
                resolve(userCredential);
            })
                .catch(function (error) {
                reject(_this.translateErrorMessage(error));
            });
        });
    };
    FirebaseAuthWrapper.prototype.sendPasswordResetEmail = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth
                .sendPasswordResetEmail(email)
                .then(function () {
                resolve(email);
            })
                .catch(function (error) {
                reject(_this.translateErrorMessage(error));
            });
        });
    };
    FirebaseAuthWrapper.prototype.createUserWithEmailAndPassword = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this
                .auth
                .createUserWithEmailAndPassword(email, password)
                .then(function (userCredential) {
                if (!userCredential.user) {
                    throw userCredential;
                }
                resolve(userCredential);
            })
                .catch(function (error) {
                reject(_this.translateErrorMessage(error));
            });
        });
    };
    FirebaseAuthWrapper.prototype.onAuthStateChanged = function (callback) {
        return this.auth.onAuthStateChanged(function (user) {
            callback(user);
        });
    };
    FirebaseAuthWrapper.prototype.translateErrorMessage = function (error) {
        var messages = ja_json_1.default;
        if (error.code in messages) {
            error.message = messages[error.code];
            return error;
        }
        else {
            return error;
        }
    };
    return FirebaseAuthWrapper;
}());
exports.FirebaseAuthWrapper = FirebaseAuthWrapper;
//# sourceMappingURL=index.js.map