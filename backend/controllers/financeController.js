const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    const { startDate, endDate, sort } = req.query;
    let filter = { userId: req.user.id };

    // Filter by date range if provided
    if (startDate && endDate) {
        filter.date = {
            [Op.between]: [new Date(startDate), new Date(endDate)],
        };
    }

    try {
        const transactions = await Transaction.findAll({
            where: filter,
            order: sort ? [[sort, 'ASC']] : [['date', 'DESC']], // Sort by provided field or by date descending
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findOne({
            where: {
                id,
                userId: req.user.id,
            },
        });
        if (transaction) {
            res.json(transaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create({ ...req.body, userId: req.user.id });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Transaction.update(req.body, {
            where: { id, userId: req.user.id },
        });

        if (updated) {
            const updatedTransaction = await Transaction.findByPk(id);
            res.status(200).json(updatedTransaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Transaction.destroy({
            where: { id, userId: req.user.id },
        });

        if (deleted) {
            res.status(200).json({ message: 'Transaction deleted' });
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
