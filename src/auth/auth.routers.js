import { Router } from "express";
import { login,register } from "./auth.controller.js";
import { registerValidator,loginValidator } from "../middlewares/validator.js";
import { uploadProfilePricture } from "../middlewares/multer-upload.js";
import { deleteFileOnError } from "../middlewares/deleteFileOnError.js";


const router = Router()

router.post(
    '/login',
    loginValidator,
    deleteFileOnError,
    login 
) 

router.post(
    '/register',
    uploadProfilePricture.single("profilePicture"),
    registerValidator,
    deleteFileOnError,
    register
)

export default router