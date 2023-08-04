
const Joi = require('joi');
const jwt = require('jsonwebtoken');

exports.validate_mid = (req, res, next) => {
    //  try{
    const schema = Joi.object(
        {
            uname: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            r_password: Joi.string().required().valid(Joi.ref('password')),

        }
    )
    const { error } = schema.validate(req.body)
    if (error) {
        return res.json({ success: false, msg: "SIGN UP CAREFULLY" })
    }
    else {
        next();
    }
}
// catch{
//     console.log(error)
// }
// }

exports.tokenVerify = (req, res, next) => {

    try {


        const _bearerToken = req.headers["authorization"];
        const _token = _bearerToken.split(" ")[1]
        const _verifyToken = jwt.verify(_token, "KEEPSMILING")

        console.log("Verified: ", _verifyToken)

        if (_verifyToken) {
            req.user = _verifyToken.user
            console.log("TOKEN VERIFIED")
            next()
        }
        else {
            return res.status(403).json({ msg: "Unauthorized Access" })
        }
    } catch (e) {
        return res.status(404).json({ msg: e })
    }
}
