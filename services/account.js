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

    create: async (name, email) => {
        return prisma.account.create({
            data: {
                name: name,
                email: email,
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
        return prisma.account.delete({
            where: {
                id: parseInt(id),
            },
        });
    },
};
