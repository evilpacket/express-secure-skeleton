
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.getAuthenticated = function(username, password, cb) {
    //Some sort of DB lookup to grab Username
    //This example is using mongoose (node wrapper for MongoDB)
    this.findOne({ user: username }, function(err, user) {
        if (err) return cb(err);

        // make sure the user exists
        if (!user) {
            return cb(null, null, 'User Not Found');
        }

        // test for a matching password
        // Call a user model function that can compare
        // a salted/hashed password
        user.comparePassword(password, function(err, isMatch) {
            if (err) return cb(err);

            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                return cb(null, user);
            }
        });
    });
};