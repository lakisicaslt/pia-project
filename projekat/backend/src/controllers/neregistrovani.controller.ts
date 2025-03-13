import * as express from 'express'
import User from '../models/user';
import firma from '../models/firma';
import moment from 'moment';





export class NeregistrovaniController{

    brojDekorisanihBasti = (req: express.Request, res: express.Response)=>{

        firma.find().then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let lista: any[] = [];

            data.forEach(firm =>{
                firm.privatneBaste.forEach(each=>{
                    if(each.prihvacen == true){
                        lista.push(each)
                    }
                })
                firm.restoranskeBaste.forEach(each=>{
                    if(each.prihvacen == true){
                        lista.push(each)
                    }
                })
            })
            if(lista){
                res.json(lista)

            }else{
                return res.json({ "message": "Error" });

            }
            
        }).catch (err => {
            console.log(err)
        })
    
    }

    brojVlasnika = (req: express.Request, res: express.Response)=>{

        User.find({'tip' : "Vlasnik", 'isActive': true}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            res.json(data)


            
        }).catch (err => {
            console.log(err)
        })
    }


    brojDekoratora = (req: express.Request, res: express.Response)=>{

        User.find({'tip' : "Dekorator"}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            res.json(data)


            
        }).catch (err => {
            console.log(err)
        })
    }


    dohvatiPosloveZa24Sata = (req: express.Request, res: express.Response)=>{

        let trenutniDatum = new Date();
        let pre24Sata = moment(trenutniDatum).subtract(24, 'hours').toDate();

        firma.find().then(firme => {
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
}

dohvatiPosloveZa7Dana = (req: express.Request, res: express.Response)=>{

    let trenutniDatum = new Date();
    let pre24Sata = moment(trenutniDatum).subtract(7, 'days').toDate();

    firma.find().then(firme => {
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
}

dohvatiPosloveZa30Dana = (req: express.Request, res: express.Response)=>{

    let trenutniDatum = new Date();
    let pre24Sata = moment(trenutniDatum).subtract(30, 'days').toDate();

    firma.find().then(firme => {
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
}
    dohvatiFirme = (req: express.Request, res: express.Response)=>{

    firma.find().then(data =>{
        if (!data) {
            return res.json({ "message": "Error" });
        }

        res.json(data)


        
    }).catch (err => {
        console.log(err)
    })
}

}