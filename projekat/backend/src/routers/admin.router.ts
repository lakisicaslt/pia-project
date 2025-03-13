import express from 'express'
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router()

adminRouter.route('/dodajFirmu').post(
    (req, res)=> new AdminController().dodajFirmu(req, res)

)

adminRouter.route('/dohvFirme').get(
    (req, res)=> new AdminController().dohvFirme(req, res)

)

adminRouter.route('/zaposli').post(
    (req, res)=> new AdminController().zaposli(req, res)

)


adminRouter.route('/prihvati').post(
    (req, res)=> new AdminController().prihvati(req, res)

)

adminRouter.route('/odbij').post(
    (req, res)=> new AdminController().odbij(req, res)

)



export default adminRouter;