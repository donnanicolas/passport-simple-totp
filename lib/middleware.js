
module.exports = function (options) {
    options = options || {};

    checkField = options.field || false;

    return function (req, res, next) {
        req.isAuthenticated = function () {
            //If the user didn't specify a field, check every user for two factor
            if ( req.user[checkField] || field === false ) {
                return ( req.user && req.session && req.session._totp_secondFactor === true );
            } else {
                return true;
            }
        };

        next();
    };
};
