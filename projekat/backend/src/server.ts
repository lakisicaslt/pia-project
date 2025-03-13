import express from 'express';
import cors from 'cors' //da bismo mogli sa razlicitih domena tj sa 4200 i 4000
import userRouter from './routers/user.router';
import adminRouter from './routers/admin.router';
import vlasnikRouter from './routers/vlasnik.router';
import mongoose from 'mongoose';
import neregistrovaniRouter from './routers/neregistrovani';


const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/projekatDB')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('BAZA POVEZANA')
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/admin', adminRouter)
router.use('/vlasnik', vlasnikRouter)
router.use('/neregistrovani', neregistrovaniRouter)


app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));