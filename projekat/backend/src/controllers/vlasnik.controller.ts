import * as express from 'express'
import User from '../models/user';
import firma from '../models/firma';
import moment from 'moment';





type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';


export class VlasnikController{

    dohvatiVlasnika = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;

        User.findOne({'username' : username}).then (data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            res.json(data)
            
        }).catch (err => {
            console.log(err)
        })


    }

    pretraziFirme = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let adresa = req.body.adresa;
        let query: { [key: string]: any } = {};
    
        if (ime) {
            query['ime'] = ime;
        }
        if (adresa) {
            query['adresa'] = adresa;
        }
    
        firma.find(query).then(data => {
            if (!data || data.length === 0) {
                return res.json([]);
            }
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.json({ "message": "Server error" });
        });
    }

    dohvatiFirmu = (req: express.Request, res: express.Response)=>{

        let ime = req.body.ime;

        firma.findOne({'ime' : ime}).then (data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            res.json(data)
            
        }).catch (err => {
            console.log(err)
        })


    }

    validacijaZakazivanja = (req: express.Request, res: express.Response)=>{
        let nazivFirme = req.body.nazivFirme;
        let datum_vreme = new Date(req.body.datum_vreme);

        firma.findOne({'ime' : nazivFirme}).then (data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            if (!data.datum_pocetka || !data.datum_kraja) {
                return res.json({ "message": "Error" });
            }

            if(data.datum_pocetka <= datum_vreme && data.datum_kraja >= datum_vreme){

                return res.json({ "message": "Firma na godisnjem odmoru!" });

            }

            return  res.json({ "message": "ok" });
            
        }).catch (err => {
            console.log(err)
        })
    }

    dodajPrivatnuBastu = (req: express.Request, res: express.Response) =>{

        let nazivFirme = req.body.nazivFirme;
        let privatnaBasta = req.body.privatnaBasta
        let ime = req.body.ime;

        firma.findOne({'ime' : nazivFirme}).then (data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            data.privatneBaste.push(privatnaBasta);

            data.save().then(resp => {

                User.findOne({'username' : ime}).then (nesto =>{
                    if (!nesto) {
                        return res.json({ "message": "Error" });
                    }
        
                    nesto.privatneBaste.push(privatnaBasta);
                    nesto.save().then(resp => {
                        res.json({ "message": "ok" });

                    })

                })
            
                
            }).catch(err => {
                console.log(err);
                res.json({ "message": "Error" });
            });
            
        }).catch (err => {
            console.log(err)
        })

    }

    dodajRestoranskuBastu = (req: express.Request, res: express.Response) => {
        let nazivFirme = req.body.nazivFirme;
        let restoranskaBasta = req.body.restoranskaBasta;
        let ime = req.body.ime;

    
        firma.findOne({ 'ime': nazivFirme }).then(data => {
            if (!data) {
                console.log("Firma nije pronađena");
                return res.json({ "message": "Error" });
            }
    
    
            data.restoranskeBaste.push(restoranskaBasta);
    
            data.save().then(resp => {

                User.findOne({'username' : ime}).then (nesto =>{
                    if (!nesto) {
                        return res.json({ "message": "Error" });
                    }
        
                    nesto.restoranskeBaste.push(restoranskaBasta);
                    nesto.save().then(resp => {
                        res.json({ "message": "ok" });

                    })

                })
            }).catch(err => {
                console.log("Greška pri čuvanju restoranske bašte:", err);
                res.json({ "message": "Error saving restaurant garden" });
            });
        }).catch(err => {
            console.log("Greška pri pronalaženju firme:", err);
            res.json({ "message": "Error" });
        });
    }


    dohvatiZavrsenePoslovePrivatne = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;

        User.findOne({'username' : username}).then (data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let zavrseneBaste = data.privatneBaste.filter(basta => {
                if(!basta.datum_vreme){
                    return
                }
                return basta.datum_vreme < new Date();
            });
    
            res.json(zavrseneBaste);
            
        }).catch (err => {
            console.log(err)
        })


    }


    dohvatiZavrsenePosloveRestoranske = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;

        User.findOne({'username' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let zavrseneBaste = data.restoranskeBaste.filter(basta => {
                if(!basta.datum_vreme){
                    return false
                }
                return basta.datum_vreme < new Date();
            });
    
            res.json(zavrseneBaste);
            
        }).catch (err => {
            console.log(err)
        })


    }

    renovirajPrivatnu= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        datum_vreme = new Date(datum_vreme);


        User.findOne({'username' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;
            let imeFirme = "" 

            data.privatneBaste.forEach(each=>{
                if(each.datumZakazivanja){
                let eachDatum = each.datumZakazivanja;

                
                if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){

                    each.renoviranje = true;
                    isUpdated = true
                    imeFirme = each.imeFirme
                }
            }
            })
            firma.findOne({'ime' : imeFirme}).then(k=>{
                if(!k) {
                    console.log("greska")
                    return
                }

                k.privatneBaste.forEach(each=>{
                    if(each.datumZakazivanja){
                    let eachDatum = each.datumZakazivanja;
                    
                    if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){

                        each.renoviranje = true;
                    
                    }
                }
                })

                k.save().then(n=>{})

                

            })

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })


    }

    renovirajRestoransku= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        datum_vreme = new Date(datum_vreme);


        User.findOne({'username' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;
            let imeFirme = "" 

            data.restoranskeBaste.forEach(each=>{
                if(each.datumZakazivanja){
                let eachDatum = each.datumZakazivanja;

                
                if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){


                    each.renoviranje = true;
                    isUpdated = true
                    imeFirme = each.imeFirme
                }
            }
            })
            firma.findOne({'ime' : imeFirme}).then(k=>{
                if(!k) {
                    console.log("greska")
                    return
                }

                k.restoranskeBaste.forEach(each=>{
                    if(each.datumZakazivanja){
                    let eachDatum = each.datumZakazivanja;

                    
                    if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){

                        each.renoviranje = true;
                    
                    }
                }
                })

                k.save().then(n=>{})

                

            })

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }


    dohvatiPrivatneRenovirane = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;

        User.findOne({'username' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let lista: any[] = [];

            data.privatneBaste.forEach(each=>{
                if(each.renoviranje == true){
                    lista.push(each)
                }
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

    dohvatiRestoranskeRenovirane = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;

        User.findOne({'username' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let lista: any[] = [];

            data.restoranskeBaste.forEach(each=>{
                if(each.renoviranje == true){
                    lista.push(each)
                }
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

    dohvatiRestoranskeNeobradjene = (req: express.Request, res: express.Response)=>{

        let ime = req.body.ime;

        firma.findOne({'ime' : ime}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let lista: any[] = [];

            data.restoranskeBaste.forEach(each=>{
                if(each.renoviranje == false && each.obradjen == false && each.prihvacen == null){
                    lista.push(each)
                }
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

    dohvatiPrivatneNeobradjene = (req: express.Request, res: express.Response)=>{

        let ime = req.body.ime;

        firma.findOne({'ime' : ime}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let lista: any[] = [];

            data.privatneBaste.forEach(each=>{
                if(each.renoviranje == false && each.obradjen == false && each.prihvacen == null){
                    lista.push(each)
                }
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

    prihvatiPrivatne= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        let kor_ime = req.body.kor_ime;
        datum_vreme = new Date(datum_vreme);


        firma.findOne({'ime' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;

            data.privatneBaste.forEach(each=>{

                if(each.datumZakazivanja){
                let eachDatum = each.datumZakazivanja;
                    
                if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){
                    each.prihvacen = true;
                    each.zaduzenje = kor_ime;
                    isUpdated = true
                    }
                }
                })
                

            

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }

    prihvatiRestoranske= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        let kor_ime = req.body.kor_ime;

        datum_vreme = new Date(datum_vreme);


        firma.findOne({'ime' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;

            

                data.restoranskeBaste.forEach(each=>{
                    if(each.datumZakazivanja){
                    let eachDatum = each.datumZakazivanja;
  
                    
                    if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){

                        each.prihvacen = true;
                        each.zaduzenje = kor_ime;
                        isUpdated = true
                    }
                }
                })

            

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }


    odbijPrivatne= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        let tekst = req.body.tekst;

        
        datum_vreme = new Date(datum_vreme);
 

        firma.findOne({'ime' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;


                data.privatneBaste.forEach(each=>{
                    if(each.datumZakazivanja){
                    let eachDatum = each.datumZakazivanja;
  
                    
                    
                    if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){
                        each.prihvacen = false;
                        each.komentarOdbijen = tekst;
                        isUpdated = true
                    }
                }
                })

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }

    odbijRestoranske= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        let tekst = req.body.tekst;
        datum_vreme = new Date(datum_vreme);


        firma.findOne({'ime' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;


                data.restoranskeBaste.forEach(each=>{
                    if(each.datumZakazivanja){
                    let eachDatum = each.datumZakazivanja;

                    
                    if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){

                        each.prihvacen = false;
                        each.komentarOdbijen = tekst;
                        isUpdated = true
                    }
                }
                })

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }


    dohvatiPrivatnaOdrzavanja = (req: express.Request, res: express.Response)=>{

        let ime_firme = req.body.ime_firme;

        firma.findOne({'ime' : ime_firme}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let lista: any[] = [];

            data.privatneBaste.forEach(each=>{
                if(each.renoviranje == true && each.potvrdaOdrzavanja == null){
                    lista.push(each)
                }
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




    dohvatiRestoranskaOdrzavanja =  (req: express.Request, res: express.Response)=>{

        let ime_firme = req.body.ime_firme;

        firma.findOne({'ime' : ime_firme}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }

            let lista: any[] = [];

            data.restoranskeBaste.forEach(each=>{
                if(each.renoviranje == true && each.potvrdaOdrzavanja == null){
                    lista.push(each)
                }
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


    prihvatiPrivatnaOdrzavanja= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        let procenaZavrsetka = req.body.procenaZavrsetka;
        datum_vreme = new Date(datum_vreme);
  

        firma.findOne({'ime' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;


            data.privatneBaste.forEach(each=>{

                if(each.datumZakazivanja){
                let eachDatum = each.datumZakazivanja;

                    
                if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){

                    each.potvrdaOdrzavanja = true;
                    each.procenaZavrsetka = procenaZavrsetka
                    isUpdated = true
                    }
                }
                })
                

            

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }

    prihvatiRestoranskaOdrzavanja= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        let procenaZavrsetka = req.body.procenaZavrsetka;

        datum_vreme = new Date(datum_vreme);

        firma.findOne({'ime' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;

            

                data.restoranskeBaste.forEach(each=>{
                    if(each.datumZakazivanja){
                    let eachDatum = each.datumZakazivanja;

                    
                    if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){
                        each.potvrdaOdrzavanja = true;
                        each.procenaZavrsetka = procenaZavrsetka
                        isUpdated = true
                    }
                }
                })

            

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }


    odbijPrivatnaOdrzavanja= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;

        
        datum_vreme = new Date(datum_vreme);


        firma.findOne({'ime' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;


                data.privatneBaste.forEach(each=>{
                    if(each.datumZakazivanja){
                    let eachDatum = each.datumZakazivanja;

                    
                    if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){

                        each.potvrdaOdrzavanja = false;
                        isUpdated = true
                    }
                }
                })

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }

    odbijRestoranskaOdrzavanja= (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let datum_vreme = req.body.datum_vreme;
        datum_vreme = new Date(datum_vreme);


        firma.findOne({'ime' : username}).then(data =>{
            if (!data) {
                return res.json({ "message": "Error" });
            }
            let isUpdated = false;



                data.restoranskeBaste.forEach(each=>{
                    if(each.datumZakazivanja){
                    let eachDatum = each.datumZakazivanja;
                    
                    if(new Date(eachDatum).getTime() == datum_vreme.getTime() ){

                        each.potvrdaOdrzavanja = false;
                        isUpdated = true
                    }
                }
                })

            if (isUpdated) {
                data.save().then(() => {
                    res.json({ "message": "Servisiranje zakazano" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "Error saving data" });
                });
            }else{
                res.json({ "message": "Error" });
            }

            
        }).catch (err => {
            console.log(err)
        })
    
    }

    dohvatiPosaoPoMesecima = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let ime_firme = req.body.ime_firme;

        

        firma.findOne({'ime' : ime_firme}).then(firma=>{

            if (!firma) {
                return res.json({ "message": "Error" });
            }

            let posloviPoMesecima: { [key: string]: number } = {};

            firma.privatneBaste.forEach(each=>{
                if(each && each.datum_vreme){
                    if(each.zaduzenje == username){
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
            })

            firma.restoranskeBaste.forEach(each=>{
                if(each && each.datum_vreme){
                    if(each.zaduzenje == username){
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
            })
            res.json(posloviPoMesecima);

        }).catch(err => {
            console.error(err);
            res.json({"message": "Error"});
        });
        
    }

    dohvatiRaspodeluPoslova = (req: express.Request, res: express.Response)=>{

        let ime_firme = req.body.ime_firme;

        

        firma.findOne({'ime' : ime_firme}).then(data=>{

            if (!data) {
                console.log("EVO JE GRESKA!")
                return res.json({ "message": "Error" });
            }

            let posloviPoDekoraterima: { [key: string]: number } = {};

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
            res.json({"message": "Error"});
        });
        
    }




    dohvatiDane = (req: express.Request, res: express.Response) => {
        let ime_firme = req.body.ime_firme;
        let trenutniDatum = new Date();
        let datumPre24Meseca = moment(trenutniDatum).subtract(24, 'months').toDate();
    
        firma.findOne({ 'ime': ime_firme }).then(firma => {
            if (!firma) {
                return res.json({ "message": "Firma nije pronađena" });
            }
    
            let posloviPoDanimaUNedelji: Record<DayOfWeek, number> = {
                "MON": 0, "TUE": 0, "WED": 0, "THU": 0, "FRI": 0, "SAT": 0, "SUN": 0
            };
            let brojDana: Record<DayOfWeek, Set<string>> = {
                "MON": new Set(), "TUE": new Set(), "WED": new Set(), "THU": new Set(), "FRI": new Set(), "SAT": new Set(), "SUN": new Set()
            };
    
            firma.privatneBaste.forEach(each => {
                let datumPosla = each.datum_vreme;
                if (!datumPosla) {
                    return res.json({ "message": "Datum posla није pronađen" });
                }
    
                if (datumPosla >= datumPre24Meseca && datumPosla <= trenutniDatum && each.prihvacen == true) {
                    let danUNedelji = moment(datumPosla).format('ddd').toUpperCase() as DayOfWeek; // Добијамо MON, TUE...
                    
                    if (danUNedelji in posloviPoDanimaUNedelji) {
                        posloviPoDanimaUNedelji[danUNedelji]++;
                        let formattedDate = moment(datumPosla).format('YYYY-MM-DD');
                        brojDana[danUNedelji].add(formattedDate);  // Сет спречава дуплирање
                    }
                }
            });
    
            firma.restoranskeBaste.forEach(each => {
                let datumPosla = each.datum_vreme;
                if (!datumPosla) {
                    return res.json({ "message": "Datum posla није pronađen" });
                }
    
                if (datumPosla >= datumPre24Meseca && datumPosla <= trenutniDatum && each.prihvacen == true) {
                    let danUNedelji = moment(datumPosla).format('ddd').toUpperCase() as DayOfWeek;
                    
                    if (danUNedelji in posloviPoDanimaUNedelji) {
                        posloviPoDanimaUNedelji[danUNedelji]++;
                        let formattedDate = moment(datumPosla).format('YYYY-MM-DD');
                        brojDana[danUNedelji].add(formattedDate);  // Сет спречава дуплирање
                    }
                }
            });
    
            
            const brojMeseci = 24; 
    
            let prosecniPosloviPoDanimaUNedelji: Record<DayOfWeek, number> = {
                "MON": 0, "TUE": 0, "WED": 0, "THU": 0, "FRI": 0, "SAT": 0, "SUN": 0
            };
            
            for (let dan in posloviPoDanimaUNedelji) {
                prosecniPosloviPoDanimaUNedelji[dan as DayOfWeek] = parseFloat(
                    (posloviPoDanimaUNedelji[dan as DayOfWeek] / brojMeseci).toFixed(2)  
                );
            }
    
            res.json(prosecniPosloviPoDanimaUNedelji);
        }).catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
    }


}