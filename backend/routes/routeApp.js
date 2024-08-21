const express = require('express');
const authController = require('../controllers/authController');
const financeController = require('../controllers/financeController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update', authMiddleware, authController.updateUser);
router.get('/me', authMiddleware, authController.getUser);

// Finance routes
router.get('/transactions', authMiddleware, financeController.getTransactions);
router.get('/transactions/:id', authMiddleware, financeController.getTransactionById);
router.post('/transactions', authMiddleware, financeController.createTransaction);
router.put('/transactions/:id', authMiddleware, financeController.updateTransaction);
router.delete('/transactions/:id', authMiddleware, financeController.deleteTransaction);


module.exports = router;
