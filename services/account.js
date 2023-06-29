import pkg from "@prisma/client"
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { account: Account, space: Space, item: Item} = prisma

export default {
    getAll(req,res) {
        Account.findMany()
            .then((data)=>{
                res.status(200).send(data)
            })
            .catch((error)=>{
                res.status(500).send({
                    message: error.message || 'Des erreurs sont parvenues lors de la recherche de Compte'
                })
            })

    },
    get(req,res) {
        const { id } = req.params

        Account.findUnique({
            where: {
                id: parseInt(id)
            }
        })
            .then((data)=>{
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                        message: `Impossible de trouver un compte avec l'id = ${id}`
                    })
            })
            .catch((error)=>{
                res.status(500).send({
                    message: error.message || `Des erreurs sont parvenues lors de la recherche de Compte avec l'id = ${id}`
                })
                 
            })

    },
    create(req,res) {
        const { name, email } = req.body

        Account.create({
            data: {
                name: name,
                email: email,
                space: {
                    create: [
                        {name : `${name} Space`}
                    ]

                }
            }
        })
            .then(()=>{
                res.status(201).send({
                    message: `Le compte a bien été créé`
                })
            })
            .catch((error)=>{
                res.status(500).send({
                    message: error.message || `Des erreurs sont parvenues lors de la création du Compte`
                })
                 
            })

    },
    update(req,res) {
        const { id } = req.params
        const { name, email } = req.body

        Account.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                email: email
            }
        })
            .then(()=>{
                res.status(200).send({
                    message: `Le compte a bien été mis à jour`
                })
            })
            .catch((error)=>{
                res.status(500).send({
                    message: error.message || `Des erreurs sont parvenues lors de la mis a jour du Compte avec l'id = ${id}`
                })
                 
            })

    },
    delete(req,res) {
        const { id } = req.params

        const deleteSpace = Space.delete({
            where : {
                account_id: parseInt(id)
            }
        })
        const deleteItems = Item.deleteMany({
            where : {
                account_id: parseInt(id)
            }
        })

        const deleteAccount = Account.delete({
            where: {
                id: parseInt(id)
            }
        })

        prisma
            .$transaction([deleteSpaces,deleteItems,deleteAccount])
            .then(()=>{
                res.status(200).send({
                    message: `Le compte a bien été supprimé`
                })
            })
            .catch((error)=>{
                res.status(500).send({
                    message: error.message || `Des erreurs sont parvenues lors de la supression du Compte avec l'id = ${id}`
                })
                 
            })
    },
}