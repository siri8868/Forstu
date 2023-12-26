const { body } = require("express-validator");
const ROLES = require("./roles");

const signUpValidationSchema = [
  body("name")
    .isAlpha()
    .withMessage("name should only contain alphabets")
    .notEmpty()
    .withMessage("name should not be empty")
    .isLength({ max: 15, min: 3 })
    .withMessage("name should be between 3 - 15 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("Password should be between 6 - 15 characters"),
  body("role")
    .isAlpha()
    .withMessage("Role should only contain alphabets")
    .notEmpty()
    .withMessage("Role should not be empty")
    .isUppercase()
    .withMessage("Invalid Role")
    .custom((value) => {
      value = value.toUpperCase();
      if (ROLES.DB_ROLE_ENUM.includes(value)) {
        return true;
      } else {
        throw new Error("Invalid Role!");
      }
    }),
];

const signInValidationSchema = [
  body("username")
    .notEmpty()
    .withMessage("Username should not be empty")
    .isLength({ max: 15, min: 3 })
    .withMessage("Username should be between 3 - 15 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("Password should be between 6 - 15 characters"),
];

const changePasswordValidationSchema = [
  body("prevPassword")
    .notEmpty()
    .withMessage("Previous password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("Previous password should be between 6 - 15 characters"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("New password should be between 6 - 15 characters"),
];

const getUserValidationSchema = [
  body("id")
    .notEmpty()
    .withMessage("ID should not be empty")
    .isNumeric()
    .withMessage("ID should be a number")
    .custom((value) => {
      if (value > 0) {
        return true;
      } else {
        throw new Error("Invalid ID!");
      }
    }),
];

const addUserValidationSchema = [
  body("username")
    .notEmpty()
    .withMessage("Username should not be empty")
    .isAlphanumeric()
    .withMessage("Username should only contain alphabets and numbers")
    .isLength({ max: 15, min: 3 })
    .withMessage("Username should be between 3 - 15 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("Password should be between 6 - 15 characters"),
  body("role")
    .notEmpty()
    .withMessage("Role should not be empty")
    .isAlpha()
    .withMessage("Role should only contain alphabets")
    .isUppercase()
    .withMessage("Invalid Role")
    .custom((value) => {
      value = value.toUpperCase();
      if (ROLES.DB_ROLE_ENUM.includes(value)) {
        return true;
      } else {
        throw new Error("Invalid Role!");
      }
    }),
];

const deleteUserValidationSchema = [
  body("id")
    .notEmpty()
    .withMessage("ID should not be empty")
    .isNumeric()
    .withMessage("ID should be a number")
    .custom((value) => {
      if (value > 0) {
        return true;
      } else {
        throw new Error("Invalid ID!");
      }
    }),
];

const updateUserValidationSchema = [
  body("id")
    .notEmpty()
    .withMessage("ID should not be empty")
    .isNumeric()
    .withMessage("ID should be a number")
    .custom((value) => {
      if (value > 0) {
        return true;
      } else {
        throw new Error("Invalid ID!");
      }
    }),
  body("username")
    .notEmpty()
    .withMessage("Username should not be empty")
    .isLength({ max: 15, min: 3 })
    .withMessage("Username should be between 3 - 15 characters"),
  body("role")
    .notEmpty()
    .withMessage("Role should not be empty")
    .isUppercase()
    .withMessage("Invalid Role")
    .custom((value) => {
      value = value.toUpperCase();
      if (ROLES.DB_ROLE_ENUM.includes(value)) {
        return true;
      } else {
        throw new Error("Invalid Role!");
      }
    }),
];

module.exports = {
  signUpValidationSchema,
  signInValidationSchema,
  getUserValidationSchema,
  addUserValidationSchema,
  updateUserValidationSchema,
  deleteUserValidationSchema,
  changePasswordValidationSchema,
};
