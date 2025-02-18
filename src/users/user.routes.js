import { Router } from "express";
import { check } from "express-validator";
import {getUsers,getUserById,updateUser, updatePass} from "./users.controller.js"
import {existentUserById} from "../helpers/db-validator.js"
import { validarCampos } from "../middlewares/validar-campos.js"; 
import { uploadProfilePricture } from "../middlewares/multer-upload.js";

const router = Router()


router.get("/",getUsers)

router.get(
    "/findUser/:id", 
    [
        check("id", "Invalid id").isMongoId(), 
        check("id").custom(existentUserById), 
        validarCampos
    ],
    getUserById
)

router.put(
    '/:id', 
    uploadProfilePricture.single('profilePicture'),
    [
        check("id", "Invalid id").isMongoId(), 
        check("id").custom(existentUserById),
        validarCampos
    ],
    updateUser
)

router.put(
    '/updatePassword/:id', 
    [
        check("id", "Invalid id").isMongoId(),
        check("id").custom(existentUserById),
        validarCampos
    ],
    updatePass
)


export default router