import { User } from "../models/user.js";
import { Task } from "../models/tasks.js";
import logger from "../logs/logger.js";
import { Status } from "../constants/index.js";

async function getUsers(req, res) {
    try{
        const users = await User.findAll({
            attributes:['id', 'username', 'password','status'],
            order:[['id', 'DESC']],
            where:{
                status: Status.ACTIVE,
            }
        });
        res.json(users);
    }catch(error){
        logger.error('Error de getUsers: ' + error);    
        res.status(500).json({message: 'Error en el Servidor'});
    }

}

async function createUsers(req, res) {
    try{
        const {username, password} = req.body;
        const user = await User.create({username, password});
        res.json(user);
    }catch(error){
        logger.error('Error de createUsers: ' + error);    
        res.status(500).json({message: 'Error en el Servidor'});
    }
}
async function getUser(req, res) {
    try{
        const user = await User.findByPk(req.params.id,{
            attributes: ['username', 'status']
        });
        if (!user) {
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        res.json(user);
    }catch(error){
        logger.error('Error de getUsers: ' + error);    
        res.status(500).json({message: 'Error en el Servidor'});
    }

}
async function updateUser(req, res) {
    const{id} = req.params;
    const{username, password} = req.body;
    try {
        if(!username || !password)
            return res
                .status(400)
                .json({message:'Usuario y Password son requeridos'});
        const user = await User.update(
            {
                username,
                password,
            },
            {
                where:{ id },
            }
        );
        res.json(user)        
    } catch (error) {
        logger.error('Error de updateUser: ' + error);    
        res.status(500).json({message: 'Error en el Servidor'});
    }
}
async function activateInactivate(req,res){
    const {id} =req.params;
    const{status}=req.body;
    try{
        if (!status) return res.status(400).json({message:'Estado es requerido'});
        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message:'No existe usuario'});
        }
        
        if (user.status === status)
            return res.status(400).json({message:"El estado es el mismo al que actualizará"})
        
        user.status = status;
        await user.save();
        res.json(user);
    } catch (error){
        logger.error('Error activateInactivate: ' + error);    
        res.status(500).json({message: 'Error en el Servidor'});
    }
}
async function deleteUser(req, res) {
    const {id} =req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        await user.destroy();
        res.json({message:'Usuario borrado satisfactoriamente'});
    } catch (error) {
        logger.error('Error deleteUser: ' + error);    
        res.status(500).json({message: 'Error en el Servidor'});
    }
}

async function getTask(req, res) {
    const {id} = req.params;
    try {
        const user =  await User.findOne({
            attributes: ['username'],
            include:[{
                model:Task,
                attributes: ['name', 'done'],
                where:{done:false}
            }],
        });
        res.json(user);
    } catch (error) {
        logger.error('Error getTask: ' + error);    
        res.status(500).json({message: 'Error en el Servidor'});
    }
}
export default{
    getUsers,
    createUsers,
    getUser,
    updateUser,
    activateInactivate,
    deleteUser,
    getTask,
}