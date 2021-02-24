"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
const uuid_1 = require("uuid");
class Converter {
    constructor({ encode, decode, }) {
        this._encode = encode;
        this._decode = decode;
    }
    decode(documentSnapshot) {
        if (this._decode)
            return this._decode(documentSnapshot);
        const obj = { ...documentSnapshot.data() };
        return obj;
    }
    encode(obj) {
        if (this._encode)
            return this._encode(obj);
        return (obj?.uid ? obj : { ...obj, uid: uuid_1.v4() });
    }
}
exports.Converter = Converter;
//# sourceMappingURL=converter.js.map