import jwt from 'jsonwebtoken';
import config from './config/index.js';
import type { Request, Response, NextFunction } from "express";

interface authentictaeReq extends Request{
     user?:{
        id:string,
        username:string
     }
}

interface jwtPaylod{
  sub:string,
  username:string,
  iat?:number,
  exp?:number
}

const auth = (req:authentictaeReq,res:Response,next:NextFunction)=>{
      const authHeader = req.headers.authorization;
      
      if(!authHeader){
        return res.status(401).json({error:"Authorization is missing"});
    }
    const token=authHeader?.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"the token is malformed"});
    }
    try{
        const decoded = jwt.verify(token,config.jwtSecret) as jwtPaylod;
        req.user = {id:decoded.sub,username:decoded.username};
        next()
    }
    catch(error){
        res.status(500).json({error:"Invalid or expired Token"});
    }
}

export default auth;