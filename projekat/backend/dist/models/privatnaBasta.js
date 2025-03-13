"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Shema = mongoose_1.default.Schema;
let PrivatnaBasta = new Shema({
    datum_vreme: {
        type: Date
    },
    kvadratura_baste: {
        type: Number
    },
    kvadratura_bazen: {
        type: Number
    },
    kvadratura_zelenilo: {
        type: Number
    },
    kvadratura_inventar: {
        type: Number
    },
    datumZakazivanja: {
        type: Date, default: null
    },
    imeFirme: {
        type: String, default: ""
    },
    brBazena: {
        type: Number, default: 1
    },
    renoviranje: {
        type: Boolean, default: false
    },
    obradjen: {
        type: Boolean, default: false
    },
    prihvacen: {
        type: Boolean, default: null
    },
    zaduzenje: {
        type: String, default: ""
    },
    komentarOdbijen: {
        type: String, default: ""
    },
    procenaZavrsetka: {
        type: Date, default: null
    },
    potvrdaOdrzavanja: {
        type: Boolean, default: null
    }
});
exports.default = mongoose_1.default.model('PrivatnaBasta', PrivatnaBasta);
