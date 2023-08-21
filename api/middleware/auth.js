import jwt from "jsonwebtoken"

export const authentication = (req, res, next) => {
    const {token} = req.cookies
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const {id} = decoded
    req.user = {id: id}
    next()
}
