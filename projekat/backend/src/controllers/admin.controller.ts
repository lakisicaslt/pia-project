import * as express from 'express'
import Firma from '../models/firma'
import User from '../models/user';


export class AdminController{
    dodajFirmu = (req: express.Request, res: express.Response)=>{
        let firma = new Firma({
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
    }

    dohvFirme= (req: express.Request, res: express.Response)=>{

        Firma.find({}).then(data=>{
            res.json(data);
        }).catch (err => {
            console.log(err)
        })



    }

    zaposli = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let username = req.body.username;
    
        Firma.findOne({ 'ime': ime }).then(firma => {
            if (!firma) {
                return res.json({ "message": 'Firma not found' });
            }
    
            User.findOne({ 'username': username }).then(user => {
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
    }
    
    

    prihvati= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOne({ 'username': username }).then(user => {
            if (!user) {
                return res.json({ "message": 'User not found' });
            }
            user.isActive = true;
            user.save().then(() => {
                res.json({ "message": 'User activated' });
            }).catch(err => {
                res.json({ "message": 'Error' });
            });

        })

    }
    odbij= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOne({ 'username': username }).then(user => {
            if (!user) {
                return res.json({ "message": 'User not found' });
            }
            user.isActive = null;
            user.save().then(() => {
                res.json({ "message": 'User deactivated' });
            }).catch(err => {
                res.json({ "message": 'Error' });
            });

        })

    }








}