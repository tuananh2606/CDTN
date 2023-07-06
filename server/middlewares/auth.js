const jwt = require('jsonwebtoken');

const middlewareAuth = {
    isAuthenticatedUser: async (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json('Token is not valid');
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json('Please login to access');
        }
    },
    authorizeRoles: (req, res, next) => {
        middlewareAuth.isAuthenticatedUser(req, res, () => {
            if (!req.user.admin) {
                return res.status(403).json("You're not allow");
            }
            next();
        });
    },
};
module.exports = middlewareAuth;
