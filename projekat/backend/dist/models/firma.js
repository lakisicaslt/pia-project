"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usluga_1 = __importDefault(require("../models/usluga"));
const user_1 = __importDefault(require("../models/user"));
const privatnaBasta_1 = __importDefault(require("./privatnaBasta"));
const restoranskaBasta_1 = __importDefault(require("./restoranskaBasta"));
const Shema = mongoose_1.default.Schema;
let Firma = new Shema({
    ime: {
        type: String
    },
    adresa: {
        type: String
    },
    usluge: {
        type: [usluga_1.default.schema], default: []
    },
    lokacija: {
        type: String
    },
    kontakt_osoba: {
        type: String
    },
    zaposleni: {
        type: [user_1.default.schema], default: []
    },
    datum_pocetka: {
        type: Date
    },
    datum_kraja: {
        type: Date
    },
    privatneBaste: {
        type: [privatnaBasta_1.default.schema], default: []
    },
    restoranskeBaste: {
        type: [restoranskaBasta_1.default.schema], default: []
    }
});
exports.default = mongoose_1.default.model('Firma', Firma, 'firme');
