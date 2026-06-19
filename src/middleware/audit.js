module.exports = (
    action,
    entity
  ) => {
  
    return async (
      req,
      res,
      next
    ) => {
  
      try {
  
        console.log({
          user:
            req.user?._id,
  
          action,
  
          entity,
  
          timestamp:
            new Date()
        });
  
        next();
  
      } catch (err) {
  
        next();
      }
    };
  };