import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";



export function auth(req:Request, res:Response, next:NextFunction){
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({
        msg: 'Access Denied!!!'
    })
    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN!) as jwt.JwtPayload
        (req as any).user = verified
        next()
    } catch (error) {
        res.status(400).json({
            msg: "Invalid Token"
        })
    }
}
// export function auth(req:Request, res:Response, next:NextFunction){
//     // const token = req.header('auth-token')
//     const authorization = req.cookies.jwt
//     if(!authorization) return res.status(401).json({
//         msg: 'Access Denied!!!'
//     })
//     try {
//         const verified = jwt.verify(authorization, process.env.JWT_TOKEN!) as jwt.JwtPayload
//         (req as any).user = verified
//         next()
//     } catch (error) {
//         res.status(400).json({
//             msg: "Invalid Token"
//         })
//     }
// }

