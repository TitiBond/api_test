import { accountService } from "../services/account.js";

export const accountController = {
    getAllAccounts: async (req, res) => {
        try {
            const accounts = await accountService.getAll();
            res.json(accounts);
        } catch (error) {
            res.status(500).json({ error: "Échec de la récupération des comptes" });
        }
    },

    getAccountById: async (req, res) => {
        const { id } = req.params;
        try {
            const account = await accountService.get(id);
            if (account) {
                res.json(account);
            } else {
                res.status(404).json({ error: "Compte introuvable" });
            }
        } catch (error) {
            res.status(500).json({ error: "Échec de la récupération du compte" });
        }
    },

    createAccount: async (req, res) => {
        const { name, email } = req.body;
        try {
            const createdAccount = await accountService.create(name, email);
            res.json(createdAccount);
        } catch (error) {
            res.status(500).json({ error: "Échec de la création du compte" });
        }
    },

    updateAccount: async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const updatedAccount = await accountService.update(id, name, email);
            res.json(updatedAccount);
        } catch (error) {
            res.status(500).json({ error: "Échec de la mise à jour du compte" });
        }
    },

    deleteAccount: async (req, res) => {
        const { id } = req.params;
        try {
            await accountService.delete(id);
            res.json({ message: "Compte supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ error: "Échec de la suppression du compte" });
        }
    },
};
