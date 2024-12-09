//Import the express module
const express = require("express");
//Create a router
const router = express.Router();

//Import the routes
const installRoutes = require("./installRoutes.js");
const patientRoutes = require("./patientsRoutes");
const diagnosisRoutes = require("./diagnosisRoutes");
const surgeryRoutes = require("./surgeryRoutes");
const infectedRoutes = require("./infectionsRoutes");
const antiboioticRoutes = require("./antibioticsRoutes");
//Use the routes
router.use(installRoutes);
// router.use(patientRoutes);
// router.use(diagnosisRoutes);
// router.use(surgeryRoutes);
// router.use(infectedRoutes);
// router.use(antiboioticRoutes);
module.exports = router;
