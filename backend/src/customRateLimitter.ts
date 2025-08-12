import type { Request, Response, NextFunction } from "express";

const rateLimitWindow = 60*1000;
const windowLimit = 5;

const requestMap = new Map<string, { count: number; firstRequestTime: number }>();

export function expressRateLimitter(req: Request, res: Response, next: NextFunction){
    const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || "unknown";
    const currentTime = Date.now();
    const requestData = requestMap.get(ip);
    
    if(!requestData){
        requestMap.set(ip, {count: 1, firstRequestTime: currentTime});
        return next();
    }
    
    const timegone = currentTime - requestData.firstRequestTime;
    if(timegone > rateLimitWindow){
        requestMap.set(ip, {count: 1, firstRequestTime: currentTime});
        return next();
    }
    
    if(requestData.count >= windowLimit){
        const retry = Math.ceil((rateLimitWindow - timegone) / 1000);
        return res.status(429).json({
            error: "Too many attempts", 
            message: `Try again in ${retry} seconds`
        });
    }
    
    requestData.count++;
    requestMap.set(ip, requestData);
    next();
}
