import jwt from 'jsonwebtoken';

const generateAccessToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

export default generateAccessToken;
