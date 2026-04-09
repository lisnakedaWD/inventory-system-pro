function checkPermission(action, resourceGetter) {
  return async (req, res, next) => {
    try {
      const user = req.user;

      // Obtener recurso dinámicamente
      const resource = await resourceGetter(req);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found"
        });
      }

      //  Reglas ABAC
      const allowed = evaluatePolicy(user, resource, action);

      if (!allowed) {
        return res.status(403).json({
          success: false,
          message: "Access denied (ABAC)"
        });
      }

      req.resource = resource;
      next();

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "ABAC error"
      });
    }
  };
}

module.exports = checkPermission;