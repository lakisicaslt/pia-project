"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/adminLogin').post((req, res) => new user_controller_1.UserController().adminLogin(req, res));
userRouter.route('/getAllOwners').get((req, res) => new user_controller_1.UserController().getAllOwners(req, res));
userRouter.route('/getAllOwnersNotActive').get((req, res) => new user_controller_1.UserController().getAllOwnersNotActive(req, res));
userRouter.route('/getAllDecorators').get((req, res) => new user_controller_1.UserController().getAllDecorators(req, res));
userRouter.route('/getAllNotWorkingDecorators').get((req, res) => new user_controller_1.UserController().getAllNotWorkingDecorators(req, res));
userRouter.route('/azurirajDohvati').post((req, res) => new user_controller_1.UserController().azurirajDohvati(req, res));
userRouter.route('/azuriraj').post((req, res) => new user_controller_1.UserController().azuriraj(req, res));
exports.default = userRouter;
