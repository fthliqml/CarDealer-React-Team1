const roleCheck = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

export default roleCheck;
