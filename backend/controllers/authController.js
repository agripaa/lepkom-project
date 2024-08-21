const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const passwordHash = await argon2.hash(password);
        const user = await User.create({ username, email, password: passwordHash });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let updateData = { username, email };

        if (password) {
            const passwordHash = await argon2.hash(password);
            updateData.password = passwordHash;
        }

        const user = await User.update(updateData, {
            where: { id: req.user.id },
            individualHooks: true
        });
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'username', 'email'] });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
