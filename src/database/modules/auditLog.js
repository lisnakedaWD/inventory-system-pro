export default (sequelize, DataTypes) => {
  const AuditLog = sequelize.define("AuditLog", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resource_id: DataTypes.INTEGER,
    old_data: DataTypes.JSON,
    new_data: DataTypes.JSON
  }, {
    tableName: "audit_logs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });

  return AuditLog;
};