// const { Op } = require("sequelize");
const { Sequelize, Op } = require('sequelize');

const ROLES = require("../helpers/roles");
// const User = require("../models/usersModel");
// const collegeprofile = require("../models/collegeModel");
const Mahadbtprofiles = require("../models/mahadbtModel");

const { validationResult } = require("express-validator");
const { createHmac } = require("crypto");

const dotenv = require("dotenv");
const sequelize = require("../database/connection");
// const { Json } = require("sequelize/types/utils");
dotenv.config();


exports.getAllMahadbtProfiles = (req, res) => {
  // console.log("hellvgrtvr");
  // res.send("dddddddd");
  Mahadbtprofiles.findAll({
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
        message: "Failed to retrieve Mahadbt Profiles",
        error: error,
      });
    });
};

exports.findMahadbtProfCount = (req, res) => {
  console.log("hello count");
  Mahadbtprofiles.count()
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
        message: "Failed to retrieve count of  Mahadbt Profiles",
        error: error,
      });
    });
}

exports.totalEligibleCount = (req, res) => {
  console.log("hello");
  Mahadbtprofiles.count({
    where: {
      candidate_eligible: 'Yes'
    }
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
        message: "Failed to retrieve count of  Mahadbt Profiles",
        error: error,
      });
    });
}

exports.totalSubmitCount = (req, res) => {
  console.log("hello");
  Mahadbtprofiles.count({
    where: {
      application_status: ['Submitted', 'Pending']
    }
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
        message: "Failed to retrieve count of  Mahadbt Profiles",
        error: error,
      });
    });
}


exports.totalSubmitCountbyCaste = (req, res) => {
  console.log("hellooooooo");
  Mahadbtprofiles.findAll({
    attributes: [
      'CasteCategory',
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'count_per_category']
    ],
    where: {
      application_status: 'submitted'
    },
    group: ['CasteCategory']
  })
    .then(results => {
      const data = results.map(result => ({
        CasteCategory: result.CasteCategory,
        count_per_category: result.get('count_per_category')
      }));

      res.json({
        success: true,
        data,
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve count of Mahadbt Profiles",
        error: error.message,
      });
    });
}

exports.totalCourseAndYear = (req, res) => {
  console.log("hellooooooo from course and year");
  // console.log("requesed body", req.body)
  const userSelectedCoursename = req.body.courseName; // Replace with the actual user input
  const userSelectedCourseyear = req.body.courseYear;
  // res.send("course year coming ");
  Mahadbtprofiles.findAll({
    //   where: {
    //     coursename: userSelectedCoursename,
    //     current_year: userSelectedCourseyear,
    //     applicationStatus: ['pending', 'submitted']
    //   },
    //   group: ['coursename']
    // })
    attributes: [
      'coursename',
      'current_year',
      'applicationStatus',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count_per_status']
    ],
    where: {
      coursename: userSelectedCoursename,
      current_year: userSelectedCourseyear,
      applicationStatus: ['pending', 'submitted']
    },
    group: ['coursename', 'current_year', 'applicationStatus']
  })
    .then(results => {
      const data = results.map(result => ({
        coursename: result.count_per_course,
        coursename: result.get('coursename'),
        courseYear: result.get('current_year'),
        // courseYear : result.get('current_year'),

      }));

      res.json({
        success: true,
        data,
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve count of Mahadbt Profiles",
        error: error.message,
      });
    });
}