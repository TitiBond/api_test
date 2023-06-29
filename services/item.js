import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const itemService = {
    getAll: async () => {
        return prisma.item.findMany({
            include: {
                account: true,
            },
        });
    },

    get: async (id) => {
        return prisma.item.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                account: true,
            },
        });
    },

    create: async (name, accountId) => {
        return prisma.item.create({
            data: {
                name: name,
                account: {
                    connect: {
                        id: parseInt(accountId),
                    },
                },
            },
            include: {
                account: true,
            },
        });
    },

    update: async (id, name) => {
        return prisma.item.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name,
            },
            include: {
                account: true,
            },
        });
    },

    delete: async (id) => {
        return prisma.item.delete({
            where: {
                id: parseInt(id),
            },
        });
    },
};export default{}
