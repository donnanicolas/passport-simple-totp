# passport-simple-totp - WORK IN PROGRESS - NOT WORKING


An strategy for passportjs that consumed totp token. This is an implementation for a university project. For another implementation go to https://github.com/jaredhanson/passport-totp

## Usage
This module comes with two parts: an strategy for consuming totp token and a middleware that will help you determine if the user has used authenticated with a token or not.

### Strategy
The strategy requires a previously authenticated user.

````
passport.use( new TotpStrategy( function (user, done) {
    TokenKey.findOne( { user: user._id }).exec( function (err, key) {
        if ( err ) { return done(err); }
        if ( !user ) { return done(new Error('No user')); }

        done(null, key.key, key.time);
    });
}));

````

### Middleware
The middleware should be place just below the passport initialization and session middleware.
It will give the req object the function **isAuthenticated** which will return if the user has been authenticated
You can configure the middleware to see witch part of the user object should it check to find out if the user uses two factor or not.

````
app.use(totpMiddleware({ field: "twoFactor" }));
````

In this case it will check for **user.twoFactor**. If not provided or false, it will always check.
