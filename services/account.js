import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const accountService = {
    getAll(req, res) {
        prisma.account
            .findMany()
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Des erreurs sont survenues lors de la recherche des comptes',
                });
            });
    },

    get(req, res) {
        const { id } = req.params;

        prisma.account
            .findUnique({
                where: {
                    id: parseInt(id),
                },
            })
            .then((data) => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send({
                        message: `Impossible de trouver un compte avec l'id = ${id}`,
                    });
                }
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Des erreurs sont survenues lors de la recherche du compte avec l'id = ${id}`,
                });
            });
    },

    create(req, res) {
        const { name, email } = req.body;

        prisma.account
            .create({
                data: {
                    name: name,
                    email: email,
                    space: {
                        create: {
                            name: `${name} Space`,
                        },
                    },
                },
            })
            .then(() => {
                res.status(201).send({
                    message: `Le compte a bien été créé`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Des erreurs sont survenues lors de la création du compte`,
                });
            });
    },

    update(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;

        prisma.account
            .update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    name: name,
                    email: email,
                },
            })
            .then(() => {
                res.status(200).send({
                    message: `Le compte a bien été mis à jour`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Des erreurs sont survenues lors de la mise à jour du compte avec l'id = ${id}`,
                });
            });
    },

    delete(req, res) {
        const { id } = req.params;

        prisma.account
            .delete({
                where: {
                    id: parseInt(id),
                },
                include: {
                    space: true,
                },
            })
            .then(() => {
                res.status(200).send({
                    message: `Le compte a bien été supprimé`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Des erreurs sont survenues lors de la suppression du compte avec l'id = ${id}`,
                });
            });
    },
};

