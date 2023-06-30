import { itemService } from "../services/item.js";

export const itemController = {
    getAllItems: async (req, res) => {
        try {
            const items = await itemService.getAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: "Échec de la récupération des items" });
        }
    },

    getAllItemsByAccountId: async (req, res) => {
        const { account_id } = req.params
        try {
            const items = await itemService.getAllByAccountId(account_id);
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: "Échec de la récupération des items" });
            console.log(error)
        }
    },

    getItemById: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await itemService.get(id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ error: "Item introuvable" });
            }
        } catch (error) {
            res.status(500).json({ error: "Échec de la récupération de l'item" });
        }
    },

    createItem: async (req, res) => {
        let { name, account_id, quantity } = req.body;
        try {
            const createditem = await itemService.create(name, account_id, quantity);
            res.json(createditem);
        } catch (error) {
            res.status(500).json({ error: "Échec de la création de l'item" });
            console.log(error)
        }
    },

    updateItem: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const updateditem = await itemService.update(id, name);
            res.json(updateditem);
        } catch (error) {
            res.status(500).json({ error: "Échec de la mise à jour de l'item" });
        }
    },

    deleteItem: async (req, res) => {
        const { id } = req.params;
        try {
            await itemService.delete(id);
            res.json({ message: "Compte supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ error: "Échec de la suppression du compte" });
            console.log(error)
        }
    },
};
