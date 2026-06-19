module.exports = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  const allowedRoles = [
    "ADMIN",
    "STORE_MANAGER"
  ];

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).render("errors/403", {
      title: "Access Denied"
    });
  }

  next();
};