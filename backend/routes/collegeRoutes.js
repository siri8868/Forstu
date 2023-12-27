const express = require("express");
const {
  getAllCollegeProfile,
  // getCollegeProfile,
  // getSingleCollegeProfile,
  addCollegeProfile,
  // updateCollegeProfile
  // deleteCollegeProfile,
  // addUser,
  // deleteUser,
  // updateUser,
  // getAllUsersByRole,
  // getUserCountByRole,
  // getrecentUsers,
  // deleteUsers,
} = require("../controllers/collegeController");

const { isSignedIn, isAdmin } = require("../controllers/authController");
// const {
//   getUserValidationSchema,
//   // addUserValidationSchema,
//   // updateUserValidationSchema,
//   // deleteUserValidationSchema,
//   // globalRoleValidation,
//   // UsersValidationSchemaForIds,
// } = require("../helpers/validation");

const router = express.Router();

router.get("/getAllcollegeProfiles", getAllCollegeProfile);

// router.get("/getCollegeProfile", isSignedIn, isAdmin, getUserValidationSchema, getCollegeProfile);

// router.get("/getSingleCollegeProfile/id", getSingleCollegeProfile);

router.post("/createNewCollegeProfile", addCollegeProfile);

// router.put("/updateCollegeProfile", updateCollegeProfile);



// router.delete("/deletecollegeProfile", isSignedIn, isAdmin, getUserValidationSchema, deleteCollegeProfile);






// router.get(
//   "/userByRole",
//   isSignedIn,
//   isAdmin,
//   globalRoleValidation,
//   getAllUsersByRole
// );

// router.get("/user/recent", isSignedIn, isAdmin, getrecentUsers);

// router.post("/user", isSignedIn, isAdmin, addUserValidationSchema, addUser);

// router.put(
//   "/user",
//   isSignedIn,
//   isAdmin,
//   updateUserValidationSchema,
//   updateUser
// );

// router.delete(
//   "/user",
//   isSignedIn,
//   isAdmin,
//   deleteUserValidationSchema,
//   deleteUser
// );

// router.delete(
//   "/users",
//   isSignedIn,
//   isAdmin,
//   UsersValidationSchemaForIds,
//   deleteUsers
// );

// router.get("/profile", isSignedIn, getUserProfile);

// router.get("/getUserCountByRole", isSignedIn, isAdmin, getUserCountByRole);

module.exports = router;
