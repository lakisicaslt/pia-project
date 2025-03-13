import express from 'express'
import { VlasnikController } from '../controllers/vlasnik.controller';

const vlasnikRouter = express.Router()


vlasnikRouter.route('/dohvatiVlasnika').post(
    (req, res)=> new VlasnikController().dohvatiVlasnika(req, res)

)

vlasnikRouter.route('/pretraziFirme').post(
    (req, res)=> new VlasnikController().pretraziFirme(req, res)

)

vlasnikRouter.route('/dohvatiFirmu').post(
    (req, res)=> new VlasnikController().dohvatiFirmu(req, res)

)


vlasnikRouter.route('/validacijaZakazivanja').post(
    (req, res)=> new VlasnikController().validacijaZakazivanja(req, res)

)

vlasnikRouter.route('/dodajRestoranskuBastu').post(
    (req, res)=> new VlasnikController().dodajRestoranskuBastu(req, res)

)

vlasnikRouter.route('/dodajPrivatnuBastu').post(
    (req, res)=> new VlasnikController().dodajPrivatnuBastu(req, res)

)

vlasnikRouter.route('/dohvatiZavrsenePoslovePrivatne').post(
    (req, res)=> new VlasnikController().dohvatiZavrsenePoslovePrivatne(req, res)

)

vlasnikRouter.route('/dohvatiZavrsenePosloveRestoranske').post(
    (req, res)=> new VlasnikController().dohvatiZavrsenePosloveRestoranske(req, res)

)

vlasnikRouter.route('/renovirajPrivatnu').post(
    (req, res)=> new VlasnikController().renovirajPrivatnu(req, res)

)

vlasnikRouter.route('/renovirajRestoransku').post(
    (req, res)=> new VlasnikController().renovirajRestoransku(req, res)

)

vlasnikRouter.route('/dohvatiPrivatneRenovirane').post(
    (req, res)=> new VlasnikController().dohvatiPrivatneRenovirane(req, res)

)

vlasnikRouter.route('/dohvatiRestoranskeRenovirane').post(
    (req, res)=> new VlasnikController().dohvatiRestoranskeRenovirane(req, res)

)

vlasnikRouter.route('/dohvatiPrivatneNeobradjene').post(
    (req, res)=> new VlasnikController().dohvatiPrivatneNeobradjene(req, res)

)

vlasnikRouter.route('/dohvatiRestoranskeNeobradjene').post(
    (req, res)=> new VlasnikController().dohvatiRestoranskeNeobradjene(req, res)

)

vlasnikRouter.route('/prihvatiPrivatne').post(
    (req, res)=> new VlasnikController().prihvatiPrivatne(req, res)

)

vlasnikRouter.route('/prihvatiRestoranske').post(
    (req, res)=> new VlasnikController().prihvatiRestoranske(req, res)

)

vlasnikRouter.route('/odbijPrivatne').post(
    (req, res)=> new VlasnikController().odbijPrivatne(req, res)

)

vlasnikRouter.route('/odbijRestoranske').post(
    (req, res)=> new VlasnikController().odbijRestoranske(req, res)

)


vlasnikRouter.route('/dohvatiPrivatnaOdrzavanja').post(
    (req, res)=> new VlasnikController().dohvatiPrivatnaOdrzavanja(req, res)

)


vlasnikRouter.route('/dohvatiRestoranskaOdrzavanja').post(
    (req, res)=> new VlasnikController().dohvatiRestoranskaOdrzavanja(req, res)

)


vlasnikRouter.route('/prihvatiPrivatnaOdrzavanja').post(
    (req, res)=> new VlasnikController().prihvatiPrivatnaOdrzavanja(req, res)

)

vlasnikRouter.route('/prihvatiRestoranskaOdrzavanja').post(
    (req, res)=> new VlasnikController().prihvatiRestoranskaOdrzavanja(req, res)

)

vlasnikRouter.route('/odbijPrivatnaOdrzavanja').post(
    (req, res)=> new VlasnikController().odbijPrivatnaOdrzavanja(req, res)

)

vlasnikRouter.route('/odbijRestoranskaOdrzavanja').post(
    (req, res)=> new VlasnikController().odbijRestoranskaOdrzavanja(req, res)

)

vlasnikRouter.route('/dohvatiPosaoPoMesecima').post(
    (req, res)=> new VlasnikController().dohvatiPosaoPoMesecima(req, res)

)


vlasnikRouter.route('/dohvatiRaspodeluPoslova').post(
    (req, res)=> new VlasnikController().dohvatiRaspodeluPoslova(req, res)

)

vlasnikRouter.route('/dohvatiDane').post(
    (req, res)=> new VlasnikController().dohvatiDane(req, res)

)



export default vlasnikRouter;