const User = require('../models/User'); 

async function authenticateRole(req, res, next) {
    const username = req.headers['username'];

    if (!username) return res.status(401).send('Access Denied: No username provided.');

    try {
        const user = await User.findOne({ username: username });

        if (!user) return res.status(401).send('User not found.');

        req.user = user; // Add user object to the request
        next();
    } catch (error) {
        res.status(400).send('An error occurred.');
    }
}

function isAdmin(req, res, next) {
    if (!req.user.role.includes('admin')) {
        return res.status(403).send('Error: Admin access required.');
    }
    next();
}

module.exports = { authenticateRole, isAdmin };