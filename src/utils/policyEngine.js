function evaluatePolicy(user, resource, action) {
  // Regla 1: Admin puede todo
  if (user.role === "admin") return true;

  // Regla 2: Multi-tenant obligatorio
  if (user.tenantId !== resource.tenantId) return false;

  // Regla 3: Permisos por acción
  switch (action) {

    case "read":
      return true;

    case "update":
      // Solo si es dueño o estado activo
      return (
        resource.createdBy === user.id &&
        resource.status === "active"
      );

    case "delete":
      // Solo dueño
      return resource.createdBy === user.id;

    default:
      return false;
  }
}

module.exports = evaluatePolicy;