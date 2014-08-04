var passport    = require('passport-strategy'),
    totp        = require('notp').totp;

function Strategy (options, setup) {
    if ( !setup ) {
        setup = options;
        options = {};
    }

    this._field = options.field || 'code';
    this._window = options.window || 6;
    this._time = options.time || 30;
    this._setup = setup;
    passport.Strategy.call(this);
    this.name = 'totp';
};

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function (req, options) {
    options = options || {};

    var code = req.body.code || req.query.code;

    if ( code ) { return this.fail({ message: options.badRequestMessage || 'Missing code' }, 400); }

    var self = this;

    this._setup(req.user, function (err, key, time) {
        if ( err ) { self.err(err); }

        time = time || self.time;
        var rv = totp.verify(code, key, { window: self.window, time: self.time });

        if ( !rv ) { return self.error(); }

        return self.success(req.user);
    });
};

module.Strategy = Strategy;
