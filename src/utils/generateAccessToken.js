import jwt from 'jsonwebtoken';

const generateAccessToken = (userId, role, email) => {
    return jwt.sign({ id: userId, role, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

export default generateAccessToken;
