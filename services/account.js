import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const accountService = {
    getAll: async () => {
        return prisma.account.findMany({
            include: {
                items: true,
                space: true,
                sharedSpaces: true,
            },
        });
    },

    get: async (id) => {
        return prisma.account.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                items: true,
                space: true,
                sharedSpaces: true,
            },
        });
    },

    create: async (name, email, password) => {
        return prisma.account.create({
            data: {
                name: name,
                email: email,
                password: password,
                space: {
                    create: {
                        name: `${name} Space`,
                    },
                },
            },
            include: {
                items: true,
                space: true,
                sharedSpaces: true,
            },
        });
    },

    update: async (id, name, email) => {
        return prisma.account.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name,
                email: email,
            },
            include: {
                items: true,
                space: true,
                sharedSpaces: true,
            },
        });
    },

    delete: async (id) => {
        const deleteSpace = prisma.space.delete({
            where: {
                account_id : parseInt(id)
            }
        })
        const deleteItems = prisma.item.deleteMany({
            where: {
                account_id : parseInt(id)
            }
        })
        const deleteAccount = prisma.account.delete({
            where: {
                id: parseInt(id),
            },
        });

        return prisma.$transaction([deleteSpace, deleteItems, deleteAccount])
    },



    getAccountByEmail: async (email) => {
        return prisma.account.findUnique({
            where: {
                email : email
            }
        })
    }
};
