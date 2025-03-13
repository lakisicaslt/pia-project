"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); //da bismo mogli sa razlicitih domena tj sa 4200 i 4000
const user_router_1 = __importDefault(require("./routers/user.router"));
const admin_router_1 = __importDefault(require("./routers/admin.router"));
const vlasnik_router_1 = __importDefault(require("./routers/vlasnik.router"));
const mongoose_1 = __importDefault(require("mongoose"));
const neregistrovani_1 = __importDefault(require("./routers/neregistrovani"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/projekatDB');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('BAZA POVEZANA');
});
const router = express_1.default.Router();
router.use('/users', user_router_1.default);
router.use('/admin', admin_router_1.default);
router.use('/vlasnik', vlasnik_router_1.default);
router.use('/neregistrovani', neregistrovani_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
