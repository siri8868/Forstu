const sequelize = require("./connection");
const User = require("../models/usersModel");
const collegeprofile = require("../models/collegeModel");
const Mahadbtprofiles = require("../models/mahadbtModel");
const ExcelInfo = require("../models/testExcelModel");
const dummyModel = require("../models/dummyExcelModel");
const courseData = require("../models/courseModel");
const streamData = require("../models/streamModel");
const QualificationLevel = require("../models/qaulfification-levelModel");
const MahadbtCourseName = require("../models/mahadbtCourseNameModel");
const MahadbtCollegeStream = require("../models/mahadbtCollegeStreamModel");
const MahadbtQualificationLevel = require("../models/MahadbtQualificationLevelModel");



User.sync({
  alter: false,
});

collegeprofile.sync({
  alter: false,
});

Mahadbtprofiles.sync({
  alter: false,
});

ExcelInfo.sync({
  alter: false,
});

dummyModel.sync({
  alter: false,
})

courseData.sync({
  alter: false
})

streamData.sync({
  alter: false
})

QualificationLevel.sync({
  alter: false
})

MahadbtCourseName.sync({
  alter: false
})

MahadbtCollegeStream.sync({
  alter: false
})

MahadbtQualificationLevel.sync({
  alter: false
})

module.exports = {
  sequelize,
  User,
  collegeprofile,
  dummyModel,
  courseData,
  streamData,
  QualificationLevel
};
