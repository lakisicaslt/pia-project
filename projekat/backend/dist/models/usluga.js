"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Shema = mongoose_1.default.Schema;
let Usluga = new Shema({
    naziv: {
        type: String
    },
    cena: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Usluga', Usluga);
