const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "dsfsdfsd5555444";

exports.createAccessToken = function(user) {
    const payload = {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        createToken: moment().unix(),
        expToken: moment().add(3, "hours").unix()
    };

    return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = function(user) {
    const payload = {
        id: user._id,
        expToken: moment().add(30, "days").unix()
    };

    return jwt.encode(payload, SECRET_KEY);
};

exports.decodeToken = function(token) {    
    return jwt.decode(token, SECRET_KEY, true);
};