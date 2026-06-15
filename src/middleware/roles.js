exports.adminOnly = (req, res, next) => {
    if (req.user.role === "ADMIN") {
      return next();
    }
  
    return res.status(403).render("errors/403");
  };
  
  exports.managerOrAdmin = (req, res, next) => {
    if (
      req.user.role === "ADMIN" ||
      req.user.role === "STORE_MANAGER"
    ) {
      return next();
    }
  
    return res.status(403).render("errors/403");
  };