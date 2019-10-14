// Restricts routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If chef is logged in, continue with request to the restricted route
  if (req.chef) {
    return next();
  }

  return res.redirect("/");
};
