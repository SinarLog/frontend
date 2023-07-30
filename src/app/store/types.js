/**
 * @typedef {Object} Role
 * @property {string} id
 * @property {string} name
 * @property {string} code
 */

/**
 * @typedef {Object} Job
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} User
 * @property {string} fullName
 * @property {string} email
 * @property {Role} role
 * @property {Job} job
 */

export const EmptyUser = {
  id: "",
  fullName: "",
  email: "",
  role: {
    id: "",
    name: "",
    code: "",
  },
  job: {
    id: "",
    name: "",
  },
};

export const Types = {};
