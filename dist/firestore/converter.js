"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
var uuid_1 = require("uuid");
var Converter = /** @class */ (function () {
    function Converter(_a) {
        var encode = _a.encode, decode = _a.decode;
        this._encode = encode;
        this._decode = decode;
    }
    Converter.prototype.decode = function (documentSnapshot) {
        if (this._decode)
            return this._decode(documentSnapshot);
        var obj = __assign({}, documentSnapshot.data());
        return obj;
    };
    Converter.prototype.encode = function (obj) {
        if (this._encode)
            return this._encode(obj);
        return ((obj === null || obj === void 0 ? void 0 : obj.uid) ? obj : __assign(__assign({}, obj), { uid: uuid_1.v4() }));
    };
    return Converter;
}());
exports.Converter = Converter;
//# sourceMappingURL=converter.js.map