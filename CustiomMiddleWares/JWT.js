const jwt = require('jsonwebtoken');

function verifyJwt(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
        res.status(401).send('unauthorized access')
    }
    const token = authHeader?.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Forbiden Token" });
        }
        req.decoded = decoded;
        next();
    })
}

module.exports = verifyJwt;