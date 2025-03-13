import mongoose from "mongoose";
import Usluga from "../models/usluga";

const Shema = mongoose.Schema

let RestoranskaBasta = new Shema({
    datum_vreme:{
        type: Date
    },
    kvadratura_baste:{
        type: Number
    },
    kvadratura_fontana:{
        type: Number
    },
    kvadratura_zelenilo:{
        type: Number
    },
    broj_inventar:{
        type: Number
    },
    tekst:{
        type: String
    },
    usluge:{
        type: [Usluga.schema], default: []
    },
    datumZakazivanja:{
        type: Date,  default: null
    },
    imeFirme:{
        type: String, default: ""
    },
    brFontana:{
        type: Number, default: 1
    },
    renoviranje:{
        type: Boolean, default: false
    },
    obradjen:{
        type: Boolean, default: false
    },
    prihvacen:{
        type: Boolean, default: null
    },
    zaduzenje:{
        type: String, default: ""
    },
    komentarOdbijen:{
        type: String, default: ""
    },
    procenaZavrsetka:{
        type: Date, default: null
    },
    potvrdaOdrzavanja:{
        type: Boolean, default: null
    }
})

export default mongoose.model('RestoranskaBasta', RestoranskaBasta)