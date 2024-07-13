const jwt = require("jsonwebtoken")

const AdminAuth = async (req, res, next) => {
    const token = req.session.admin
    if (!token) {
        return res.status(401).send("Unauthorized Request")
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).send("Unauthorized Request")
        }
        req.onlyAdmin = decoded.onlyAdmin
        next()
    } catch (err) {
        return res.status(401).send("Unauthorized Request")
    }
}

module.exports = AdminAuth