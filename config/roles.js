const allRoles = {
  user: ["addReview", "manageProfile"],
  admin: ["getUsers", "manageUsers", "manageProducts", "getProducts"],
};
const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
module.exports = {
  roles,
  roleRights,
};
