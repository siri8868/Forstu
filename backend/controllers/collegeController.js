const { Op } = require("sequelize");
const ROLES = require("../helpers/roles");
// const User = require("../models/usersModel");
const collegeprofile = require("../models/collegeModel");

const { validationResult } = require("express-validator");
const { createHmac } = require("crypto");

const dotenv = require("dotenv");
dotenv.config();

exports.getAllCollegeProfile = (req, res) => {
  collegeprofile.findAll({

  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve College Profile",
        error: error,
      });
    });
};



exports.getSingleCollegeProfile = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    collegeprofile.findOne({
      attributes: [
        "id",
        "instutute_choice_code",
        "institute_name",
        "institute_state",
        "institute_district",
        "institute_taluka",
      ],
      where: {
        id: req.body.id,
      },
    })
      .then((data) => {
        if (data) {
          data = JSON.stringify(data);
          data = JSON.parse(data);

          res.status(200).json({
            success: true,
            data,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "College Profile not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to get College Profile",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error,
    });
  }
};

exports.addCollegeProfile = (req, res) => {
  try {
    const {
      instutute_choice_code,
      institute_name,
      institute_state,
      institute_district,
      institute_taluka,
    } = req.body;

    console.log(instutute_choice_code, institute_name, institute_state, institute_district, institute_taluka);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    collegeprofile.create({
      instutute_choice_code,
      institute_name,
      institute_district,
      institute_taluka,
    })
      .then((data) => {
        return res.status(200).json({
          message: "College Profile Creation successfull",
          success: true,
          data: {
            id: data.id,
            name: data.institute_name,
          },
        });
      })
      .catch((error) => {
        error.errors[0].instance = undefined;
        if (error.errors[0].type == "unique violation") {
          // 409 Conflict status code to indicate a conflict with the current state of the resource due to a unique constraint violation.
          return res.status(409).json({
            success: false,
            error: error.errors[0],
            message: "College Profile already exists",
          });
        } else {
          return res.status(400).json({
            success: false,
            error: error.errors[0],
            message: "something went wrong while signup!",
          });
        }
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
      message: "something went wrong!",
    });
  }
};

// exports.updateCollegeProfile = (req, res) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: errors.array()[0].msg,
//       });
//     }

//     const body = req.body;
//     collegeprofile.update(body, {
//       where: {
//         id: req.body.id,
//         name: 
//       },
//     })
//       .then((data) => {
//         if (data[0]) {
//           return res.status(200).json({
//             success: true,
//             message: "User updated successfully",
//           });
//         } else {
//           return res.status(404).json({
//             success: false,
//             message: "User not found",
//           });
//         }
//       })
//       .catch((errors) => {
//         return res.status(500).json({
//           success: false,
//           message: "Failed to update user",
//           errors,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

// exports.deleteCollegeProfile = (req, res) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: errors.array()[0].msg,
//       });
//     }

//     collegeprofile.destroy({
//       where: {
//         id: req.body.id,
//       },
//     })
//       .then((data) => {
//         if (data) {
//           return res.status(200).json({
//             success: true,
//             message: "College profile deleted successfully",
//           });
//         } else {
//           return res.status(404).json({
//             success: false,
//             message: "College profile not found",
//           });
//         }
//       })
//       .catch((error) => {
//         return res.status(500).json({
//           success: false,
//           message: "Failed to delete College profile",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

// exports.deleteUsers = (req, res) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: errors.array()[0].msg,
//       });
//     }

//     User.destroy({
//       where: {
//         id: {
//           [Op.in]: req.body.Ids,
//         },
//       },
//     })
//       .then((data) => {
//         if (data) {
//           return res.status(200).json({
//             success: true,
//             message: "Users deleted successfully",
//           });
//         } else {
//           return res.status(404).json({
//             success: false,
//             message: "Users not found",
//           });
//         }
//       })
//       .catch((error) => {
//         return res.status(500).json({
//           success: false,
//           message: "Failed to delete users",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

// 

// exports.getAllUsersByRole = (req, res) => {
//   try {
//     const { role } = req.body;

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: errors.array()[0].msg,
//       });
//     }

//     if (role == ROLES.ADMIN) {
//       return res.json({
//         success: false,
//         message: "Role not allowed!",
//       });
//     }

//     User.findAll({
//       attributes: ["id", "username", "role", "createdAt", "updatedAt"],
//       where: {
//         role,
//       },
//     })
//       .then((data) => {
//         data = JSON.stringify(data);
//         data = JSON.parse(data);

//         res.json({
//           success: true,
//           data,
//           count: data.length,
//         });
//       })
//       .catch((error) => {
//         res.status(500).json({
//           success: false,
//           message: "Failed to retrieve users",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

// exports.getUserCountByRole = (req, res) => {
//   try {
//     User.count({
//       group: "role",
//       attributes: ["role"],
//     })
//       .then((data) => {
//         data = JSON.stringify(data);
//         data = JSON.parse(data);
//         let totalCount = 0;
//         data.map((item) => {
//           totalCount += item.count;
//         });

//         return res.json({
//           success: true,
//           data,
//           totalCount: totalCount,
//         });
//       })
//       .catch((error) => {
//         return res.status(500).json({
//           success: false,
//           message: "Failed to get user count",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

// exports.getrecentUsers = (req, res) => {
//   try {
//     User.findAll({
//       order: [
//         // Will escape title and validate DESC against a list of valid direction parameters
//         ["id", "DESC"],
//       ],
//       limit: 5,
//       attributes: ["id", "username", "role", "createdAt", "updatedAt"],
//       where: {
//         role: {
//           [Op.ne]: ROLES.ADMIN,
//         },
//       },
//     })
//       .then((data) => {
//         data = JSON.stringify(data);
//         data = JSON.parse(data);

//         res.json({
//           success: true,
//           data,
//           count: data.length,
//         });
//       })
//       .catch((error) => {
//         res.status(500).json({
//           success: false,
//           message: "Failed to retrieve users",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

const pass_encryptor = (plainPassword, salt) => {
  return createHmac("sha256", salt).update(plainPassword).digest("hex");
};
