import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)

)

userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)

)

userRouter.route('/changePassword').post(
    (req, res)=> new UserController().changePassword(req, res)

)
userRouter.route('/adminLogin').post(
    (req, res)=> new UserController().adminLogin(req, res)

)

userRouter.route('/getAllOwners').get(
    (req, res)=> new UserController().getAllOwners(req, res)

)

userRouter.route('/getAllOwnersNotActive').get(
    (req, res)=> new UserController().getAllOwnersNotActive(req, res)

)

userRouter.route('/getAllDecorators').get(
    (req, res)=> new UserController().getAllDecorators(req, res)

)

userRouter.route('/getAllNotWorkingDecorators').get(
    (req, res)=> new UserController().getAllNotWorkingDecorators(req, res)

)

userRouter.route('/azurirajDohvati').post(
    (req, res)=> new UserController().azurirajDohvati(req, res)

)

userRouter.route('/azuriraj').post(
    (req, res)=> new UserController().azuriraj(req, res)

)

export default userRouter;