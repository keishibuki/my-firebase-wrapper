"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthWrapper = void 0;
var firebase_1 = __importDefault(require("firebase"));
var ja_json_1 = __importDefault(require("./error/ja.json"));
var FirebaseAuthWrapper = /** @class */ (function () {
    function FirebaseAuthWrapper(auth) {
        this.auth = auth;
    }
    FirebaseAuthWrapper.prototype.getCurrentUser = function () {
        return this.auth.currentUser;
    };
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
    FirebaseAuthWrapper.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth
                .signOut()
                .then(function () {
                resolve('ログアウトに成功しました');
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
    FirebaseAuthWrapper.prototype.reauthenticateWithCredential = function (currentPassword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentUser = _this.auth.currentUser;
            if (!currentUser) {
                reject(undefined);
                return;
            }
            var credential = firebase_1.default.auth.EmailAuthProvider.credential((currentUser === null || currentUser === void 0 ? void 0 : currentUser.email) || '', currentPassword);
            currentUser
                .reauthenticateWithCredential(credential)
                .then(function () { return resolve(currentUser.uid); })
                .catch(function (error) {
                console.error(error);
                reject(error);
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
    FirebaseAuthWrapper.prototype.updatePassword = function (newPassword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = _this
                .auth
                .currentUser) === null || _a === void 0 ? void 0 : _a.updatePassword(newPassword).then(function () {
                var _a;
                resolve(((_a = _this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || '');
            }).catch(function (error) {
                reject(_this.translateErrorMessage(error));
            });
        });
    };
    FirebaseAuthWrapper.prototype.updateEmail = function (newEmail) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = _this
                .auth
                .currentUser) === null || _a === void 0 ? void 0 : _a.updateEmail(newEmail).then(function () {
                var _a;
                resolve(((_a = _this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || '');
            }).catch(function (error) {
                reject(_this.translateErrorMessage(error));
            });
        });
    };
    FirebaseAuthWrapper.prototype.onAuthStateChanged = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth.onAuthStateChanged(function (user) {
                if (!user)
                    reject(user);
                resolve(user);
            });
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