import { Schema,model } from "mongoose"

const UserSchema = Schema({
    name:{
        type: String,
        required: [true,'Name is required'], 
        maxLength: [25,'Name is too long, the limit is 25 characteres']
    },
    surname:{
        type: String,
        required: [true,'Name is required'], 
        maxLength: [25,'Cant be overcome 25 characters']
    },
    username:{
        type: String,
        unique:true
    },
    email:{
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Este campo es obligatorio'],
        minLength: 8
    },
    profilePicture:{
        type: String 
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength:8,
        required: [true,'Este campo es requerido']
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROL','USER_ROL']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
},

{
    timestamps:true, 
    versionKey:false 
}

)

UserSchema.methods.toJSON= function(){
    const {__v,password,_id,...usuario} = this.toObject() 
    usuario.uid = _id
    return usuario
}

export default model('User',UserSchema)