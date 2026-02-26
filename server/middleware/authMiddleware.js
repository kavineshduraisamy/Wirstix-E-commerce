import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

async function protect(req, res, next) {


    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            token = req.cookies.jwt;
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user;

        next();

    } catch (error) {


        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
}


function admin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: 'Not authorized as an admin' });
    }
}

export { protect, admin };
