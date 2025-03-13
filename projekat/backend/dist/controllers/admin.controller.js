"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const firma_1 = __importDefault(require("../models/firma"));
const user_1 = __importDefault(require("../models/user"));
class AdminController {
    constructor() {
        this.dodajFirmu = (req, res) => {
            let firma = new firma_1.default({
                ime: req.body.ime,
                adresa: req.body.adresa,
                usluge: req.body.usluge,
                lokacija: req.body.lokacija,
                kontakt_osoba: req.body.kontakt_osoba,
                datum_pocetka: req.body.datum_pocetka,
                datum_kraja: req.body.datum_kraja
            });
            firma.save().then(resp => {
                res.json({ "message": "ok" });
            }).catch(err => {
                console.log(err);
                res.json({ "message": "Error saving user" });
            });
        };
        this.dohvFirme = (req, res) => {
            firma_1.default.find({}).then(data => {
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
        this.zaposli = (req, res) => {
            let ime = req.body.ime;
            let username = req.body.username;
            firma_1.default.findOne({ 'ime': ime }).then(firma => {
                if (!firma) {
                    return res.json({ "message": 'Firma not found' });
                }
                user_1.default.findOne({ 'username': username }).then(user => {
                    if (!user) {
                        return res.json({ "message": 'User not found' });
                    }
                    firma.zaposleni.push(user);
                    user.works = true;
                    user.imeFirme = ime;
                    Promise.all([firma.save(), user.save()])
                        .then(() => {
                        res.json({ "message": 'User added to the firm and updated' });
                    })
                        .catch(err => {
                        res.json({ "message": 'Error saving data', error: err });
                    });
                }).catch(err => {
                    res.json({ "message": 'Error finding user', error: err });
                });
            }).catch(err => {
                res.json({ "message": 'Error finding firm', error: err });
            });
        };
        this.prihvati = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then(user => {
                if (!user) {
                    return res.json({ "message": 'User not found' });
                }
                user.isActive = true;
                user.save().then(() => {
                    res.json({ "message": 'User activated' });
                }).catch(err => {
                    res.json({ "message": 'Error' });
                });
            });
        };
        this.odbij = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then(user => {
                if (!user) {
                    return res.json({ "message": 'User not found' });
                }
                user.isActive = null;
                user.save().then(() => {
                    res.json({ "message": 'User deactivated' });
                }).catch(err => {
                    res.json({ "message": 'Error' });
                });
            });
        };
    }
}
exports.AdminController = AdminController;
