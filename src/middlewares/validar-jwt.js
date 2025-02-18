import jwt from 'jsonwebtoken';
import Usuario from "../users/user.model.js";

export const validarJWT = async(req,res,next)=>{ 
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const {uid}= jwt.verify(token, process.env.SECRETPRIVATYKEY) 

        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe en la DB'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'El usuario no esta activo'
            })
        }
        req.usuario= usuario
        next()


    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}