import jwt from 'jsonwebtoken';
import {readFile} from 'fs/promises';

const {jwtPrivateKey} = JSON.parse(await readFile('./config/custom-environment-variables.json', (err, data) => {
    if (err) throw err;
}));


export const auth = (req, res, next) => {

    let token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
        req.worker = jwt.verify(token, jwtPrivateKey);
        res.locals.user = req.worker;
        next();
    } catch (ex) {
        res.status(400).json({
            'msg': 'Invalid token',
            'error': ex.message,
        });
    }
};
