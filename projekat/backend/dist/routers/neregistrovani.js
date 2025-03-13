"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const neregistrovani_controller_1 = require("../controllers/neregistrovani.controller");
const neregistrovaniRouter = express_1.default.Router();
neregistrovaniRouter.route('/brojDekorisanihBasti').get((req, res) => new neregistrovani_controller_1.NeregistrovaniController().brojDekorisanihBasti(req, res));
neregistrovaniRouter.route('/brojVlasnika').get((req, res) => new neregistrovani_controller_1.NeregistrovaniController().brojVlasnika(req, res));
neregistrovaniRouter.route('/brojDekoratora').get((req, res) => new neregistrovani_controller_1.NeregistrovaniController().brojDekoratora(req, res));
neregistrovaniRouter.route('/dohvatiPosloveZa24Sata').get((req, res) => new neregistrovani_controller_1.NeregistrovaniController().dohvatiPosloveZa24Sata(req, res));
neregistrovaniRouter.route('/dohvatiPosloveZa7Dana').get((req, res) => new neregistrovani_controller_1.NeregistrovaniController().dohvatiPosloveZa7Dana(req, res));
neregistrovaniRouter.route('/dohvatiPosloveZa30Dana').get((req, res) => new neregistrovani_controller_1.NeregistrovaniController().dohvatiPosloveZa30Dana(req, res));
neregistrovaniRouter.route('/dohvatiFirme').get((req, res) => new neregistrovani_controller_1.NeregistrovaniController().dohvatiFirme(req, res));
exports.default = neregistrovaniRouter;
