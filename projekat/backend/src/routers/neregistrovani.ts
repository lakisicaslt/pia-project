import express from 'express'
import { NeregistrovaniController } from '../controllers/neregistrovani.controller';


const neregistrovaniRouter = express.Router()


neregistrovaniRouter.route('/brojDekorisanihBasti').get(
    (req, res)=> new NeregistrovaniController().brojDekorisanihBasti(req, res)

)

neregistrovaniRouter.route('/brojVlasnika').get(
    (req, res)=> new NeregistrovaniController().brojVlasnika(req, res)

)

neregistrovaniRouter.route('/brojDekoratora').get(
    (req, res)=> new NeregistrovaniController().brojDekoratora(req, res)

)

neregistrovaniRouter.route('/dohvatiPosloveZa24Sata').get(
    (req, res)=> new NeregistrovaniController().dohvatiPosloveZa24Sata(req, res)

)

neregistrovaniRouter.route('/dohvatiPosloveZa7Dana').get(
    (req, res)=> new NeregistrovaniController().dohvatiPosloveZa7Dana(req, res)

)

neregistrovaniRouter.route('/dohvatiPosloveZa30Dana').get(
    (req, res)=> new NeregistrovaniController().dohvatiPosloveZa30Dana(req, res)

)


neregistrovaniRouter.route('/dohvatiFirme').get(
    (req, res)=> new NeregistrovaniController().dohvatiFirme(req, res)

)



export default neregistrovaniRouter;