import { NextFunction, Request, Response } from "express"

interface CustomRequest extends Request {
    userId?: number
}

export const healthCheck = (req: CustomRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: 'hello we are ready for response.',
        userId: req.userId || 7
    })
}