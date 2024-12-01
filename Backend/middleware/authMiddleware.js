const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if the request has an Authorization header and that it starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the Authorization header (split 'Bearer' and the token)
            token = req.headers.authorization.split(' ')[1];

            // Decode the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user object to the request (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            // If the token verification fails, return unauthorized status
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // If no token is provided in the Authorization header
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
