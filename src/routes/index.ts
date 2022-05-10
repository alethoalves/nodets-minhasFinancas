import {Router} from 'express';
import * as pageController from '../controllers/pageController'
const router = Router();

router.get('/',pageController.pageUser)

router.get('/teste',(req,res)=>{
    res.send('HOME')
})

export default router;