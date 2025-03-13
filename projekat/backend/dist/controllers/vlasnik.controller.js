"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VlasnikController = void 0;
const user_1 = __importDefault(require("../models/user"));
const firma_1 = __importDefault(require("../models/firma"));
const moment_1 = __importDefault(require("moment"));
class VlasnikController {
    constructor() {
        this.dohvatiVlasnika = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
        this.pretraziFirme = (req, res) => {
            let ime = req.body.ime;
            let adresa = req.body.adresa;
            let query = {};
            if (ime) {
                query['ime'] = ime;
            }
            if (adresa) {
                query['adresa'] = adresa;
            }
            firma_1.default.find(query).then(data => {
                if (!data || data.length === 0) {
                    return res.json([]);
                }
                res.json(data);
            }).catch(err => {
                console.log(err);
                res.json({ "message": "Server error" });
            });
        };
        this.dohvatiFirmu = (req, res) => {
            let ime = req.body.ime;
            firma_1.default.findOne({ 'ime': ime }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                res.json(data);
            }).catch(err => {
                console.log(err);
            });
        };
        this.validacijaZakazivanja = (req, res) => {
            let nazivFirme = req.body.nazivFirme;
            let datum_vreme = new Date(req.body.datum_vreme);
            firma_1.default.findOne({ 'ime': nazivFirme }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                if (!data.datum_pocetka || !data.datum_kraja) {
                    return res.json({ "message": "Error" });
                }
                if (data.datum_pocetka <= datum_vreme && data.datum_kraja >= datum_vreme) {
                    return res.json({ "message": "Firma na godisnjem odmoru!" });
                }
                return res.json({ "message": "ok" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dodajPrivatnuBastu = (req, res) => {
            let nazivFirme = req.body.nazivFirme;
            let privatnaBasta = req.body.privatnaBasta;
            let ime = req.body.ime;
            firma_1.default.findOne({ 'ime': nazivFirme }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                data.privatneBaste.push(privatnaBasta);
                data.save().then(resp => {
                    user_1.default.findOne({ 'username': ime }).then(nesto => {
                        if (!nesto) {
                            return res.json({ "message": "Error" });
                        }
                        nesto.privatneBaste.push(privatnaBasta);
                        nesto.save().then(resp => {
                            res.json({ "message": "ok" });
                        });
                    });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error" });
                });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dodajRestoranskuBastu = (req, res) => {
            let nazivFirme = req.body.nazivFirme;
            let restoranskaBasta = req.body.restoranskaBasta;
            let ime = req.body.ime;
            firma_1.default.findOne({ 'ime': nazivFirme }).then(data => {
                if (!data) {
                    console.log("Firma nije pronađena");
                    return res.json({ "message": "Error" });
                }
                data.restoranskeBaste.push(restoranskaBasta);
                data.save().then(resp => {
                    user_1.default.findOne({ 'username': ime }).then(nesto => {
                        if (!nesto) {
                            return res.json({ "message": "Error" });
                        }
                        nesto.restoranskeBaste.push(restoranskaBasta);
                        nesto.save().then(resp => {
                            res.json({ "message": "ok" });
                        });
                    });
                }).catch(err => {
                    console.log("Greška pri čuvanju restoranske bašte:", err);
                    res.json({ "message": "Error saving restaurant garden" });
                });
            }).catch(err => {
                console.log("Greška pri pronalaženju firme:", err);
                res.json({ "message": "Error" });
            });
        };
        this.dohvatiZavrsenePoslovePrivatne = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let zavrseneBaste = data.privatneBaste.filter(basta => {
                    if (!basta.datum_vreme) {
                        return;
                    }
                    return basta.datum_vreme < new Date();
                });
                res.json(zavrseneBaste);
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiZavrsenePosloveRestoranske = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let zavrseneBaste = data.restoranskeBaste.filter(basta => {
                    if (!basta.datum_vreme) {
                        return false;
                    }
                    return basta.datum_vreme < new Date();
                });
                res.json(zavrseneBaste);
            }).catch(err => {
                console.log(err);
            });
        };
        this.renovirajPrivatnu = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            datum_vreme = new Date(datum_vreme);
            user_1.default.findOne({ 'username': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                let imeFirme = "";
                data.privatneBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.renoviranje = true;
                            isUpdated = true;
                            imeFirme = each.imeFirme;
                        }
                    }
                });
                firma_1.default.findOne({ 'ime': imeFirme }).then(k => {
                    if (!k) {
                        console.log("greska");
                        return;
                    }
                    k.privatneBaste.forEach(each => {
                        if (each.datumZakazivanja) {
                            let eachDatum = each.datumZakazivanja;
                            if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                                each.renoviranje = true;
                            }
                        }
                    });
                    k.save().then(n => { });
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.renovirajRestoransku = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            datum_vreme = new Date(datum_vreme);
            user_1.default.findOne({ 'username': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                let imeFirme = "";
                data.restoranskeBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.renoviranje = true;
                            isUpdated = true;
                            imeFirme = each.imeFirme;
                        }
                    }
                });
                firma_1.default.findOne({ 'ime': imeFirme }).then(k => {
                    if (!k) {
                        console.log("greska");
                        return;
                    }
                    k.restoranskeBaste.forEach(each => {
                        if (each.datumZakazivanja) {
                            let eachDatum = each.datumZakazivanja;
                            if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                                each.renoviranje = true;
                            }
                        }
                    });
                    k.save().then(n => { });
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiPrivatneRenovirane = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let lista = [];
                data.privatneBaste.forEach(each => {
                    if (each.renoviranje == true) {
                        lista.push(each);
                    }
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
        this.dohvatiRestoranskeRenovirane = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let lista = [];
                data.restoranskeBaste.forEach(each => {
                    if (each.renoviranje == true) {
                        lista.push(each);
                    }
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
        this.dohvatiRestoranskeNeobradjene = (req, res) => {
            let ime = req.body.ime;
            firma_1.default.findOne({ 'ime': ime }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let lista = [];
                data.restoranskeBaste.forEach(each => {
                    if (each.renoviranje == false && each.obradjen == false && each.prihvacen == null) {
                        lista.push(each);
                    }
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
        this.dohvatiPrivatneNeobradjene = (req, res) => {
            let ime = req.body.ime;
            firma_1.default.findOne({ 'ime': ime }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let lista = [];
                data.privatneBaste.forEach(each => {
                    if (each.renoviranje == false && each.obradjen == false && each.prihvacen == null) {
                        lista.push(each);
                    }
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
        this.prihvatiPrivatne = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            let kor_ime = req.body.kor_ime;
            datum_vreme = new Date(datum_vreme);
            firma_1.default.findOne({ 'ime': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                data.privatneBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.prihvacen = true;
                            each.zaduzenje = kor_ime;
                            isUpdated = true;
                        }
                    }
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.prihvatiRestoranske = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            let kor_ime = req.body.kor_ime;
            datum_vreme = new Date(datum_vreme);
            firma_1.default.findOne({ 'ime': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                data.restoranskeBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.prihvacen = true;
                            each.zaduzenje = kor_ime;
                            isUpdated = true;
                        }
                    }
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.odbijPrivatne = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            let tekst = req.body.tekst;
            datum_vreme = new Date(datum_vreme);
            firma_1.default.findOne({ 'ime': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                data.privatneBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.prihvacen = false;
                            each.komentarOdbijen = tekst;
                            isUpdated = true;
                        }
                    }
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.odbijRestoranske = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            let tekst = req.body.tekst;
            datum_vreme = new Date(datum_vreme);
            firma_1.default.findOne({ 'ime': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                data.restoranskeBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.prihvacen = false;
                            each.komentarOdbijen = tekst;
                            isUpdated = true;
                        }
                    }
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiPrivatnaOdrzavanja = (req, res) => {
            let ime_firme = req.body.ime_firme;
            firma_1.default.findOne({ 'ime': ime_firme }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let lista = [];
                data.privatneBaste.forEach(each => {
                    if (each.renoviranje == true && each.potvrdaOdrzavanja == null) {
                        lista.push(each);
                    }
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
        this.dohvatiRestoranskaOdrzavanja = (req, res) => {
            let ime_firme = req.body.ime_firme;
            firma_1.default.findOne({ 'ime': ime_firme }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let lista = [];
                data.restoranskeBaste.forEach(each => {
                    if (each.renoviranje == true && each.potvrdaOdrzavanja == null) {
                        lista.push(each);
                    }
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
        this.prihvatiPrivatnaOdrzavanja = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            let procenaZavrsetka = req.body.procenaZavrsetka;
            datum_vreme = new Date(datum_vreme);
            firma_1.default.findOne({ 'ime': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                data.privatneBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.potvrdaOdrzavanja = true;
                            each.procenaZavrsetka = procenaZavrsetka;
                            isUpdated = true;
                        }
                    }
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.prihvatiRestoranskaOdrzavanja = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            let procenaZavrsetka = req.body.procenaZavrsetka;
            datum_vreme = new Date(datum_vreme);
            firma_1.default.findOne({ 'ime': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                data.restoranskeBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.potvrdaOdrzavanja = true;
                            each.procenaZavrsetka = procenaZavrsetka;
                            isUpdated = true;
                        }
                    }
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.odbijPrivatnaOdrzavanja = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            datum_vreme = new Date(datum_vreme);
            firma_1.default.findOne({ 'ime': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                data.privatneBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.potvrdaOdrzavanja = false;
                            isUpdated = true;
                        }
                    }
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.odbijRestoranskaOdrzavanja = (req, res) => {
            let username = req.body.username;
            let datum_vreme = req.body.datum_vreme;
            datum_vreme = new Date(datum_vreme);
            firma_1.default.findOne({ 'ime': username }).then(data => {
                if (!data) {
                    return res.json({ "message": "Error" });
                }
                let isUpdated = false;
                data.restoranskeBaste.forEach(each => {
                    if (each.datumZakazivanja) {
                        let eachDatum = each.datumZakazivanja;
                        if (new Date(eachDatum).getTime() == datum_vreme.getTime()) {
                            each.potvrdaOdrzavanja = false;
                            isUpdated = true;
                        }
                    }
                });
                if (isUpdated) {
                    data.save().then(() => {
                        res.json({ "message": "Servisiranje zakazano" });
                    }).catch(err => {
                        console.log(err);
                        res.json({ "message": "Error saving data" });
                    });
                }
                else {
                    res.json({ "message": "Error" });
                }
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiPosaoPoMesecima = (req, res) => {
            let username = req.body.username;
            let ime_firme = req.body.ime_firme;
            firma_1.default.findOne({ 'ime': ime_firme }).then(firma => {
                if (!firma) {
                    return res.json({ "message": "Error" });
                }
                let posloviPoMesecima = {};
                firma.privatneBaste.forEach(each => {
                    if (each && each.datum_vreme) {
                        if (each.zaduzenje == username) {
                            let datumZavrsetka = each.datum_vreme;
                            if (datumZavrsetka.getTime() < new Date().getTime()) {
                                const godina = datumZavrsetka.getFullYear();
                                const mesec = (datumZavrsetka.getMonth() + 1).toString().padStart(2, '0');
                                const mesecniKljuc = `${godina}-${mesec}`;
                                if (!posloviPoMesecima[mesecniKljuc]) {
                                    posloviPoMesecima[mesecniKljuc] = 0;
                                }
                                posloviPoMesecima[mesecniKljuc]++;
                            }
                        }
                    }
                });
                firma.restoranskeBaste.forEach(each => {
                    if (each && each.datum_vreme) {
                        if (each.zaduzenje == username) {
                            let datumZavrsetka = each.datum_vreme;
                            if (datumZavrsetka.getTime() < new Date().getTime()) {
                                const godina = datumZavrsetka.getFullYear();
                                const mesec = (datumZavrsetka.getMonth() + 1).toString().padStart(2, '0');
                                const mesecniKljuc = `${godina}-${mesec}`;
                                if (!posloviPoMesecima[mesecniKljuc]) {
                                    posloviPoMesecima[mesecniKljuc] = 0;
                                }
                                posloviPoMesecima[mesecniKljuc]++;
                            }
                        }
                    }
                });
                res.json(posloviPoMesecima);
            }).catch(err => {
                console.error(err);
                res.json({ "message": "Error" });
            });
        };
        this.dohvatiRaspodeluPoslova = (req, res) => {
            let ime_firme = req.body.ime_firme;
            firma_1.default.findOne({ 'ime': ime_firme }).then(data => {
                if (!data) {
                    console.log("EVO JE GRESKA!");
                    return res.json({ "message": "Error" });
                }
                let posloviPoDekoraterima = {};
                data.privatneBaste.forEach(each => {
                    if (each.zaduzenje) {
                        let dekorater = each.zaduzenje;
                        if (!posloviPoDekoraterima[dekorater]) {
                            posloviPoDekoraterima[dekorater] = 0;
                        }
                        posloviPoDekoraterima[dekorater]++;
                    }
                });
                data.restoranskeBaste.forEach(each => {
                    if (each.zaduzenje) {
                        let dekorater = each.zaduzenje;
                        if (!posloviPoDekoraterima[dekorater]) {
                            posloviPoDekoraterima[dekorater] = 0;
                        }
                        posloviPoDekoraterima[dekorater]++;
                    }
                });
                res.json(posloviPoDekoraterima);
            }).catch(err => {
                console.error(err);
                res.json({ "message": "Error" });
            });
        };
        this.dohvatiDane = (req, res) => {
            let ime_firme = req.body.ime_firme;
            let trenutniDatum = new Date();
            let datumPre24Meseca = (0, moment_1.default)(trenutniDatum).subtract(24, 'months').toDate();
            firma_1.default.findOne({ 'ime': ime_firme }).then(firma => {
                if (!firma) {
                    return res.json({ "message": "Firma nije pronađena" });
                }
                let posloviPoDanimaUNedelji = {
                    "MON": 0, "TUE": 0, "WED": 0, "THU": 0, "FRI": 0, "SAT": 0, "SUN": 0
                };
                let brojDana = {
                    "MON": new Set(), "TUE": new Set(), "WED": new Set(), "THU": new Set(), "FRI": new Set(), "SAT": new Set(), "SUN": new Set()
                };
                firma.privatneBaste.forEach(each => {
                    let datumPosla = each.datum_vreme;
                    if (!datumPosla) {
                        return res.json({ "message": "Datum posla није pronađen" });
                    }
                    if (datumPosla >= datumPre24Meseca && datumPosla <= trenutniDatum && each.prihvacen == true) {
                        let danUNedelji = (0, moment_1.default)(datumPosla).format('ddd').toUpperCase(); // Добијамо MON, TUE...
                        if (danUNedelji in posloviPoDanimaUNedelji) {
                            posloviPoDanimaUNedelji[danUNedelji]++;
                            let formattedDate = (0, moment_1.default)(datumPosla).format('YYYY-MM-DD');
                            brojDana[danUNedelji].add(formattedDate); // Сет спречава дуплирање
                        }
                    }
                });
                firma.restoranskeBaste.forEach(each => {
                    let datumPosla = each.datum_vreme;
                    if (!datumPosla) {
                        return res.json({ "message": "Datum posla није pronađen" });
                    }
                    if (datumPosla >= datumPre24Meseca && datumPosla <= trenutniDatum && each.prihvacen == true) {
                        let danUNedelji = (0, moment_1.default)(datumPosla).format('ddd').toUpperCase();
                        if (danUNedelji in posloviPoDanimaUNedelji) {
                            posloviPoDanimaUNedelji[danUNedelji]++;
                            let formattedDate = (0, moment_1.default)(datumPosla).format('YYYY-MM-DD');
                            brojDana[danUNedelji].add(formattedDate); // Сет спречава дуплирање
                        }
                    }
                });
                const brojMeseci = 24;
                let prosecniPosloviPoDanimaUNedelji = {
                    "MON": 0, "TUE": 0, "WED": 0, "THU": 0, "FRI": 0, "SAT": 0, "SUN": 0
                };
                for (let dan in posloviPoDanimaUNedelji) {
                    prosecniPosloviPoDanimaUNedelji[dan] = parseFloat((posloviPoDanimaUNedelji[dan] / brojMeseci).toFixed(2));
                }
                res.json(prosecniPosloviPoDanimaUNedelji);
            }).catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            });
        };
    }
}
exports.VlasnikController = VlasnikController;
