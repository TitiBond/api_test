import { accountService } from "../services/account.js";

export const registerController = {
    register: async (req, res) => {
        const {name, email, password} = req.body
        console.log(email)
        console.log(password)
        try {
            const account = await accountService.getAccountByEmail(email)

            if(account){
                console.log(account)
                res.redirect('/login.html')
            }else{
                const createdAccount = await accountService.create(name, email, password)
                res.redirect('/login.html')
            }
            
            
        } catch (error) {
            console.log("une erreur lors de l'enregistrement est survenue")
        }
       
    },
}
