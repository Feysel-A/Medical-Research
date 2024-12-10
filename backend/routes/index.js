//Import the express module
const express = require("express");
//Create a router
const router = express.Router();

//Import the routes
const installRoutes = require("./installRoutes.js");
const userRoutes = require("./userRoutes.js");
const patientRoutes = require("./patientsRoutes");
const comorbiditiesRoutes = require("./comorbiditiesRoutes");
const nutritionalRoutes = require("./nutritionalRoutes");
const diagnosisRoutes = require("./diagnosisRoutes");
const surgeryRoutes = require("./surgeryRoutes");
const infectedRoutes = require("./infectionsRoutes");
const antiboioticRoutes = require("./antibioticsRoutes");
//Use the routes
router.use(installRoutes);
router.use(userRoutes);
router.use("/patients", patientRoutes);
router.use("/comorbidities", comorbiditiesRoutes);
router.use("/nutritional", nutritionalRoutes);
// router.use(diagnosisRoutes);
// router.use(surgeryRoutes);
// router.use(infectedRoutes);
// router.use(antiboioticRoutes);
module.exports = router;
