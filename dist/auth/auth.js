"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({
            msg: 'Access Denied!!!'
        });
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).json({
            msg: "Invalid Token"
        });
    }
}
exports.auth = auth;
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
