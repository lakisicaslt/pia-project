import mongoose from "mongoose";
import Usluga from "../models/usluga";
import User from '../models/user';
import privatnaBasta from "./privatnaBasta";
import restoranskaBasta from "./restoranskaBasta";


const Shema = mongoose.Schema

let Firma = new Shema({

    ime:{
        type: String
    },
    adresa:{
        type: String
    },
    usluge:{
        type: [Usluga.schema], default: []
    },
    lokacija:{
        type: String
    },
    kontakt_osoba:{
        type: String
    },
    zaposleni:{
        type: [User.schema], default: []
    },
    datum_pocetka:{
        type: Date
    },
    datum_kraja:{
        type: Date
    },
    privatneBaste:{
        type: [privatnaBasta.schema], default: []
    },
    restoranskeBaste:{
        type: [restoranskaBasta.schema], default: []
    }
})

export default mongoose.model('Firma', Firma, 'firme')