const jwt = require("jsonwebtoken")

const Auth = async (req, res, next) => {
    const token = req.session.encoded
    if (!token) {
        return res.status(401).send("Unauthorized Request")
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).send("Unauthorized Request")
        }
        req.user = decoded.user
        next()
    } catch (err) {
        return res.status(401).send("Unauthorized Request")
    }
}

module.exports = Auth