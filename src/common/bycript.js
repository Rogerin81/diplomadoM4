import bcrypt, { hash } from 'bcrypt';
import logger from '../logs/logger.js';

export const encriptar = async(texto) =>{
    try {
        const saltRound = +process.env.BCYPT_SALT_ROUNDS;
        return await bcrypt.hash(texto, saltRound);
    } catch (error) {
        logger.error(error.message);
        throw new Error ('Error al encriptar');
    }
};
export const comparar =async (texto, hash) =>{
    try {
        return await bcrypt.compare(texto,hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar');
    }
}