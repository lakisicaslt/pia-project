"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const privatnaBasta_1 = __importDefault(require("./privatnaBasta"));
const restoranskaBasta_1 = __importDefault(require("./restoranskaBasta"));
const Shema = mongoose_1.default.Schema;
let User = new Shema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    adresa: {
        type: String
    },
    kontakt_telefon: {
        type: Number
    },
    email_adresa: {
        type: String
    },
    profilna_slika: {
        type: String
    },
    broj_kreditne_kartice: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    tip: {
        type: String
    },
    works: {
        type: Boolean //, default: false
    },
    isActive: {
        type: Boolean //, default: false
    },
    privatneBaste: {
        type: [privatnaBasta_1.default.schema], default: []
    },
    restoranskeBaste: {
        type: [restoranskaBasta_1.default.schema], default: []
    },
    imeFirme: {
        type: String, default: ""
    }
});
exports.default = mongoose_1.default.model('User', User, 'users');
