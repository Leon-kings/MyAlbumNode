const express = require("express");
const router = express.Router();

const {
  trackVisitor,
  getVisitors,
  deleteVisitor
} = require("../controllers/trackingController");


// Track visitor
router.post("/track-visitor", trackVisitor);

// Get all visitors
router.get("/visitors", getVisitors);

// Delete visitor
router.delete("/visitors/:id", deleteVisitor);


module.exports = router;