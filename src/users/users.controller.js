import { response,request } from "express";
import { hash } from "argon2";
import User from "./user.model.js";

export const getUsers = async (req= request, res=response) => {
    try {
        const {limite =10,desde=0}=req.query
        const query= {estado:true} 

        const [total,users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            succes:true,
            total,
            users
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: "Error al obtener usuarios",
            error
        })
    }
}

export const getUserById = async (req,res) => {
    try {
        const {id}= req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                succes: false,
                msg: "User not found :c"
            })
        }

        res.status(200).json({
            succes: true,
            user
        })

        
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: "Error al obtener usuario",
            error
        })
    }
}

export const updateUser = async (req,res = response) => { 
    
    try {
        const {id}= req.params 
        const {_id,password,email,...data} = req.body 

        if(password){
            data.password = await hash(password) 
        }
        
        const user = await User.findByIdAndUpdate(id,data,{new:true}) 

        res.status(200).json({
            succes: true,
            msg:'Usuario editado exitosamente!',
            user
        })
        
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: "Error al actualizar usuario",
            error
        })
    }
}

export const updatePass = async (req,res) => {
    
    try {
        
        const {id}= req.params 
        const {password} = req.body 

        if(!password){
            return res.status(400).json({
                succes: false,
                msg: "Password is required"
            });
            
        }

        const hashedPassword = await hash(password)
        
        const user = await User.findByIdAndUpdate(
            id,
            {password: hashedPassword},
            {new:true}
        )

        if (!user) {
            return res.status(404).json({
                succes: false,
                msg: "User not found :C"
            });
        }

        res.status(200).json({
            succes: true,
            msg:'Contraseña editada exitosamente!',
            user
        })
        
        
    } catch (error) {
        console.error("Error en updatePass:", error);
        res.status(500).json({
            succes: false,
            msg: "Error al actualizar contraseña",
            error: error.message
        })
    }
}