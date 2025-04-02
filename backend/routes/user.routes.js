import express from 'express'
const app = express()
const router = express.Router()

import {userLogin, userProfile, userRegister} from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'


// register
router.post('/register', userRegister)
// userLogin
router.post('/login',userLogin)
// usrProfileById
router.get('/profile',verifyToken,userProfile)


export default router;