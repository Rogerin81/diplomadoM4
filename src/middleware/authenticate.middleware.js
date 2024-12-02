import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next){
    //obtenemos el jwt de la cabecera de la autorización
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);

    //Bearer asdasdasdasasd
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);

    if(!token) return res.sendStatus(401);

    //verificar y decodificar
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, user)=>{
        if (err) {
            console.log('error: ', err);
            return res.sendStatus(403);
        }    
        //si el token es válido
        console.log('user', user);

        req.user = user;
        next();
    }) 
}