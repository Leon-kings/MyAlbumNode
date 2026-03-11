const Visitor = require("../models/Visitor");


// TRACK VISITOR
exports.trackVisitor = async (req, res) => {
  try {
    const {
      ip,
      location,
      userAgent,
      language,
      platform,
      screen,
      timezone,
      page,
      referrer
    } = req.body;

    // Detect IP automatically if not sent
    const detectedIP =
      ip ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    // Check if IP already exists
    const existingVisitor = await Visitor.findOne({ ip: detectedIP });

    if (existingVisitor) {
      return res.status(200).json({
        success: true,
        message: "Visitor already recorded"
      });
    }

    // Save new visitor
    const visitor = await Visitor.create({
      ip: detectedIP,

      city: location?.city,
      region: location?.region,
      country: location?.country,
      latitude: location?.latitude,
      longitude: location?.longitude,
      org: location?.org,

      userAgent,
      language,
      platform,
      screen,
      timezone,
      page,
      referrer
    });

    res.status(201).json({
      success: true,
      message: "Visitor tracked successfully",
      data: visitor
    });

  } catch (error) {
    console.error("Tracking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to track visitor",
      error: error.message
    });
  }
};



// GET ALL VISITORS
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch visitors",
      error: error.message
    });
  }
};



// DELETE VISITOR
exports.deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await Visitor.findByIdAndDelete(id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visitor deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete visitor",
      error: error.message
    });
  }
};