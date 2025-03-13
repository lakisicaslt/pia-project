import * as express from 'express'
import User from '../models/user';
import * as crypto from 'crypto';
import userRouter from '../routers/user.router';




export class UserController{
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        const hashedPassword = this.hashPassword(password);
    
        User.findOne({'username': username}).then(user => {
            if (!user) {
                return res.json({ "message": "Error" });
            }
            if (user.password != hashedPassword) {
                return res.json({ "message": "Error"});
            }
            if (user.tip == "Admin") {
                return res.json({ "message": "Admin can not log in through this form." }); 
            }
            if (user.tip == "Vlasnik" && !user.isActive) {
                return res.json({ "message": "Vlasnik account is not active." });
            }
            res.json(user);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ "message": "Server error" });
        });
    }
    

    register = async (req: express.Request, res: express.Response)=>{
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

        let username = req.body.username;
        let email = req.body.email_adresa;
        let password = req.body.password;

        const existingUser = await User.findOne({ 
            $or: [{ 'username': username }, { 'email_adresa': email }] 
        });

        if (existingUser) {
            return res.json({ "message": "Username or email already exists" });
        }

        if (!passwordRegex.test(password)) {
            return res.json({ "message": "Password does not meet complexity requirements" });
        }

        const hashedPassword = this.hashPassword(password);

        let user = new User({
            ime: req.body.ime,
            prezime: req.body.prezime,
            pol: req.body.pol,
            adresa: req.body.adresa,
            kontakt_telefon: req.body.kontakt_telefon,
            email_adresa: req.body.email_adresa,
            profilna_slika: req.body.profilna_slika,
            broj_kreditne_kartice: req.body.broj_kreditne_kartice,
            username: req.body.username,
            password: hashedPassword,
            tip: req.body.tip,
            works: req.body.works,
            isActive: req.body.isActive

        });
        if(!user.profilna_slika){
            user.profilna_slika = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAADAFBMVEVHcExAAgM8AAFBAQI9AQE9AAA8AQE7AABBAQFaBAhQAwZAAQFCAgRAAgNEAQM7AAFHAgRFAQNfCA1FAQNAAQI8AAFBAQJMBAZKAgQ6AAA/AQJFAQNCAgRoBgtFAQNGAgRhBQpFAQNHAgQ9AQFzCA9RBAdvBw06AAB3CRA/AQJEAQNEAQI8AAFSBQhDAQI+AQFGAwRCAgNOBAZOBAdSBglaCAzPzs6/EyP08/P/rjGvEiDY19aYER23trbymif29vaEEhz/5W7gihnIx8aCERuNjIypqKjX1tajEB3l5ORgDxarER/19PSIEhyPERyUEBvS0dG/vb2mEh/n5+fq6eluDRXu7u7NzMuMERvf3t6fEB31nylzd2OxER/h4ODy8PB7CRHEw8L8qS75pCv+rDDw7+//xUp9EBm8u7nLysn/3GPV1NT29fXkoUSuER/ljhybEBzd3Nx4Dxewr6/bipKyGieamZbokR+ECxNZBgrGxcTBwb6pER68EiL/4WmmpaOFERu1ESC5EiH0nCjKQE3ZfoaXDRi5uLfgm6KWlZSfn5zpyMt/ChLVbnfrys2NDBbTIjL/0lna2tns6+vQV2LptXBzChHj4uLCHi3TY23/uj7/5G1nDhb62GTNSlb28uzs0NLanKFmCA61tLOAgnbowcSIjXbz6uvktLjuzaCJCxX/zFL/tTmkqoyKioeQj4/WcXvvlyThjBrhq7C8PEfrliLz4Mf/sjXEJjXJOUfGLjzcmJ7vxY/w2bjMbnf/v0bt7OzckZd8fm7Td3+wtKKboIR3e2qFhX/w2tyUl4fmu7/RvXC3uqyCelm3Kzjipavzs17JY23x4+T0qDrARlHDiTLGW2TSgonDUlzrvYD2u2qurof10GCPj3GFgmDUiSLt1tjzrEn169705tKpi03vozbLHy/hljDty2SqrpXlxWPPs1+4oV28sICNkn3v3uD75YD66LLoqVWZFiGkmWTHn1KQiGDSzLKahlX335bs09bzv3rhuVTBvqX7y4A8AgAXv6Y4AAABAHRSTlMAJID9GvpN/vbw8PAGFecwrPT+w4tFlv7ycDvdD/TW/fKju1T5/fZk/F7Ms3nSnISSWbfkZ3D///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+A9gX4HQAAF9xJREFUeNrsnV9MU1kexyuhUkBRgxqQP6lKEMX454VbaJiT0ig0kthOOyVllRaVDd2LjA0EDYgEgsAwgBHcrYzRmPhnjKOzRmPWPy/XPzOjjhMTjU87Zudhk9Hd1X2aZLMvs+felnLP6Z97Wi7nlJ1+H7Xpud9Pzz3n/v6ci0aTUkoppZRSSimllFJKKaWUUkoppZTSQtOW1b9p+0s3FeX+lv1vzfDUFVCfc0uTxv/arH5ubzblQVdl6rYsSY7pX1zKcVyvlvKwa7J6SzK2JYH/ldo6TpSukO64i1Zw3EBp9krG9pcszxyQ/HN5i+iOXKgVR+3X5yxmOv1zSrigstZQHlsbIL8rs3gNu+mvOzrjn9Ovpzx4dntw5Mas3EVM7BeW6wdC/rnSfMrDF9eFxh7KK2ewJy7KLuNk8mylPH7ukGz0Mvp74ra8drl/7upayhew/AQyPtwTaSIozJVPf1G719FegMbQCxgo1dHbE5fpyjhMjcWUAeSX4JfQX0RrT9wCn31x7cqhDGCjPuwauPbM4lVUQr/e8LH7ddSDAS6CGjNzl833Q3iGJ9LIXAblZXhZXsTLEPfE9PkO/SJKl04XQLqOiyKPbu28BSaB0C+i8pZRvgcyuKgq066en/m4VdsYdVDqwYCuPzqB3lLtPOyJMPSLMSb1YCDnKBdDA0XZal/Q0oKSWCOWbqAdDDRyMdWuL0h8T1yaLmrZYlHr0ySV6z6OOV7ZZsoA1u3mFFRHtCdCr6sCLlfm5uZuypakk5SVKUrvkXRCYbQjtBPja69yihrKWxdpc0pPX7w4Py0N+g14DbocGxoaOrRXEhe/TpRTBrB1jOSyPCtCeyKc0ZvT1uUWZGtFyyUeD/SbmNfIsGlXBvJLyS4M7onr09bm5ogzusyze+jjvQPcfKiOdjS0XU94Zb0les/VoV393PyqnX5lgEsqDdCuDEQL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"
        }
        user.works = false;
        user.isActive = false;
        user.save().then(resp => {
            
            res.json({ "message": "ok" });
        }).catch(err => {
            console.log(err);
            res.json({ "message": "Error saving user" });
        });
    }

    hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    changePassword = (req: express.Request, res: express.Response)=>{

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        const hashedOldPassword = this.hashPassword(oldPassword);
        let newPassword = req.body.newPassword;
        let newPassword2 = req.body.newPassword2;
        const hashedNewPassword = this.hashPassword(newPassword);
        const hashedNewPassword2 = this.hashPassword(newPassword2);

        if (!passwordRegex.test(newPassword)) {
            return res.json({ "message": "Password does not meet complexity requirements" });
        }

        if(hashedNewPassword == hashedNewPassword2){
            User.findOne({'username' : username, 'password' : hashedOldPassword}).then (user =>{
                if(!user){
                    return res.json({ "message": "Error saving password, old password do not match or username not found." })
                }

                user.password = hashedNewPassword;
                user.save().then(()=>{
                    res.json({ "message": "Password changed." })
                }
                )
                
            }).catch (err => {
                console.log(err)
                res.json({ "message": "Error saving change." })
            })
        

        }
        else{
            return res.json({ "message": "Error saving password, new passwords do not match." });
        }

        


    }

    adminLogin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        const hashedPassword = this.hashPassword(password);

        User.findOne({'username' : username, 'password' : hashedPassword}).then (data =>{
            if(data?.tip == "Vlasnik" || data?.tip == "Dekorator"){
                return res.json({ "message": "Decorators and owners can not log in through this form." }); 
            }
            res.json(data)
            
        }).catch (err => {
            console.log(err)
        })
    }

    getAllOwners = (req: express.Request, res: express.Response)=>{

        let tip = "Vlasnik";

        User.find({'tip' : tip}).then(data=>{
            res.json(data);
        }).catch (err => {
            console.log(err)
        })
        

    }
    getAllOwnersNotActive = (req: express.Request, res: express.Response)=>{

        let tip = "Vlasnik";

        User.find({'tip' : tip, 'isActive' : "false"}).then(data=>{
            res.json(data);
        }).catch (err => {
            console.log(err)
        })
        

    }

    getAllDecorators = (req: express.Request, res: express.Response)=>{

        let tip = "Dekorator";

        User.find({'tip' : tip}).then(data=>{
            res.json(data);
        }).catch (err => {
            console.log(err)
        })
        

    }

    getAllNotWorkingDecorators = (req: express.Request, res: express.Response)=>{

        let tip = "Dekorator";

        User.find({'tip' : tip, 'works' : false}).then(data=>{
            res.json(data);
        }).catch (err => {
            console.log(err)
        })
        

    }

    azurirajDohvati = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'username': username }).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    azuriraj = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    
        User.findOne({ 'username': username }).then(user => {
            if (!user) {
                return res.json({ "message": "User not found" });
            }

            user.ime = req.body.ime;
            user.prezime = req.body.prezime;
            user.pol = req.body.pol;
            user.adresa = req.body.adresa;
            user.kontakt_telefon = req.body.kontakt_telefon;
            user.email_adresa = req.body.email_adresa;
            user.profilna_slika = req.body.profilna_slika;
            user.broj_kreditne_kartice = req.body.broj_kreditne_kartice;
            if(user.password){
            if (req.body.password && this.hashPassword(req.body.password) != this.hashPassword(user.password)) {
                if (!passwordRegex.test(req.body.password)) {
                    return res.json({ "message": "Password does not meet complexity requirements" });
                }
                user.password = this.hashPassword(req.body.password);
            }
        }
            user.tip = req.body.tip;
    
            user.save().then(() => {
                res.json({ "message": "User updated successfully" });
            }).catch(err => {
                console.log(err);
                res.json({ "message": "Error saving user" });
            });
        }).catch(err => {
            console.log(err);
            res.json({ "message": "Error finding user" });
        });
    }
    



}