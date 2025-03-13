import mongoose from "mongoose";
import privatnaBasta from "./privatnaBasta";
import restoranskaBasta from "./restoranskaBasta";

const Shema = mongoose.Schema

let User = new Shema({
    ime:{
        type: String
    },
    prezime:{
        type: String
    },
    pol:{
        type: String
    },
    adresa:{
        type: String
    },
    kontakt_telefon:{
        type: Number
    },
    email_adresa:{
        type: String
    },
    profilna_slika:{
        type: String
    },
    broj_kreditne_kartice:{
        type: Number
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    tip:{
        type: String
    },
    works:{
        type: Boolean//, default: false
    },
    isActive:{
        type: Boolean//, default: false
    },
    privatneBaste:{
        type: [privatnaBasta.schema], default: []
    },
    restoranskeBaste:{
        type: [restoranskaBasta.schema], default: []
    },
    imeFirme:{
        type: String, default: ""
    }
})

export default mongoose.model('User', User, 'users')