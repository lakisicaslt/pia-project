"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeregistrovaniController = void 0;
const user_1 = __importDefault(require("../models/user"));
const firma_1 = __importDefault(require("../models/firma"));
const moment_1 = __importDefault(require("moment"));
class NeregistrovaniController {
    constructor() {
        this.brojDekorisanihBasti = (req, res) => {
            firma_1.default.find().then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let lista = [];
                data.forEach(firm => {
                    firm.privatneBaste.forEach(each => {
                        if (each.prihvacen == true) {
                            lista.push(each);
                        }
                    });
                    firm.restoranskeBaste.forEach(each => {
                        if (each.prihvacen == true) {
                            lista.push(each);
                        }
                    });
                });
                if (lista) {
                    res.json(lista);
                }
                else {
                    return res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.brojVlasnika = (req, res) => {
            user_1.default.find({ 'tip': "Vlasnik", 'isActive': true }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
        this.brojDekoratora = (req, res) => {
            user_1.default.find({ 'tip': "Dekorator" }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiPosloveZa24Sata = (req, res) => {
            let trenutniDatum = new Date();
            let pre24Sata = (0, moment_1.default)(trenutniDatum).subtract(24, 'hours').toDate();
            firma_1.default.find().then(firme => {
                if (!firme || firme.length == 0) {
                    return res.json({ "message": "Nema firmi u bazi" });
                }
                let brojPoslova24Sata = 0;
                firme.forEach(firma => {
                    firma.privatneBaste.forEach(each => {
                        let datumPosla = each.datum_vreme;
                        if (datumPosla && datumPosla >= pre24Sata && datumPosla <= trenutniDatum) {
                            brojPoslova24Sata++;
                        }
                    });
                    firma.restoranskeBaste.forEach(each => {
                        let datumPosla = each.datum_vreme;
                        if (datumPosla && datumPosla >= pre24Sata && datumPosla <= trenutniDatum) {
                            brojPoslova24Sata++;
                        }
                    });
                });
                res.json(brojPoslova24Sata);
            }).catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            });
        };
        this.dohvatiPosloveZa7Dana = (req, res) => {
            let trenutniDatum = new Date();
            let pre24Sata = (0, moment_1.default)(trenutniDatum).subtract(7, 'days').toDate();
            firma_1.default.find().then(firme => {
                if (!firme || firme.length == 0) {
                    return res.json({ "message": "Nema firmi u bazi" });
                }
                let brojPoslova24Sata = 0;
                firme.forEach(firma => {
                    firma.privatneBaste.forEach(each => {
                        let datumPosla = each.datum_vreme;
                        if (datumPosla && datumPosla >= pre24Sata && datumPosla <= trenutniDatum) {
                            brojPoslova24Sata++;
                        }
                    });
                    firma.restoranskeBaste.forEach(each => {
                        let datumPosla = each.datum_vreme;
                        if (datumPosla && datumPosla >= pre24Sata && datumPosla <= trenutniDatum) {
                            brojPoslova24Sata++;
                        }
                    });
                });
                res.json(brojPoslova24Sata);
            }).catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            });
        };
        this.dohvatiPosloveZa30Dana = (req, res) => {
            let trenutniDatum = new Date();
            let pre24Sata = (0, moment_1.default)(trenutniDatum).subtract(30, 'days').toDate();
            firma_1.default.find().then(firme => {
                if (!firme || firme.length == 0) {
                    return res.json({ "message": "Nema firmi u bazi" });
                }
                let brojPoslova24Sata = 0;
                firme.forEach(firma => {
                    firma.privatneBaste.forEach(each => {
                        let datumPosla = each.datum_vreme;
                        if (datumPosla && datumPosla >= pre24Sata && datumPosla <= trenutniDatum) {
                            brojPoslova24Sata++;
                        }
                    });
                    firma.restoranskeBaste.forEach(each => {
                        let datumPosla = each.datum_vreme;
                        if (datumPosla && datumPosla >= pre24Sata && datumPosla <= trenutniDatum) {
                            brojPoslova24Sata++;
                        }
                    });
                });
                res.json(brojPoslova24Sata);
            }).catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            });
        };
        this.dohvatiFirme = (req, res) => {
            firma_1.default.find().then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.NeregistrovaniController = NeregistrovaniController;
