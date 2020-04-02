const User = require('../models/User');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res) {
        const { user, password } = req.body;
        const users = await User.findOne({ user }).select('+password');

        if (!users) {
            return res.status(400).send({ error: 'User not found' });
        }

        if (!await bcrypt.compare(password, users.password)) {
            return res.status(400).send({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: users.id }, authConfig.secret, {
            expiresIn: 86400
        });

        res.send({ users, token });
    },

    async store(req, res) {
        const users = await User.find({}).sort('-userID');
        const { email } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }

        if (users.length > 0) {
            const userID = users[0].userID + 1;
            const newUser = await User.create({
                email: req.body.email,
                user: req.body.user,
                password: req.body.password,
                userID: userID
            });

            return res.json(newUser);
        } else {
            const newUser = await User.create({
                email: req.body.email,
                user: req.body.user,
                password: req.body.password,
                userID: 0
            });

            return res.json(newUser);
        }
    }
};
