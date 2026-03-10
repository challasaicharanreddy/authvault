const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      // Check if logged in user's role is allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: "Access denied. You don't have permission." 
        });
      }
      next();
    };
  };
  
  module.exports = authorizeRoles;