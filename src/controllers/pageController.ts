import { Request, Response } from "express";

export const pageUser = (req: Request, res: Response)=>{
    res.send('Página do usuário')
//res.render('index-2')
}
