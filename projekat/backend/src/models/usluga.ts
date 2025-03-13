import mongoose from "mongoose";

const Shema = mongoose.Schema

let Usluga = new Shema({
    naziv:{
        type: String
    },
    cena:{
        type: String
    }
})

export default mongoose.model('Usluga', Usluga)