"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.route('/dodajFirmu').post((req, res) => new admin_controller_1.AdminController().dodajFirmu(req, res));
adminRouter.route('/dohvFirme').get((req, res) => new admin_controller_1.AdminController().dohvFirme(req, res));
adminRouter.route('/zaposli').post((req, res) => new admin_controller_1.AdminController().zaposli(req, res));
adminRouter.route('/prihvati').post((req, res) => new admin_controller_1.AdminController().prihvati(req, res));
adminRouter.route('/odbij').post((req, res) => new admin_controller_1.AdminController().odbij(req, res));
exports.default = adminRouter;
