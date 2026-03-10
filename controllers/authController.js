// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // REGISTER
// exports.registerUser = async (req, res) => {
// try {

//   const { email, password } = req.body;

//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     return res.status(400).json({
//       success: false,
//       message: "User already exists"
//     });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     email,
//     password: hashedPassword
//   });

//   res.status(201).json({
//     success: true,
//     message: "User registered successfully",
//     user
//   });

// } catch (error) {
//   res.status(500).json({
//     success: false,
//     message: "Registration failed",
//     error: error.message
//   });
// }
// };

// // LOGIN
// exports.loginUser = async (req, res) => {
// try {

//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid email or password"
//     });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid email or password"
//     });
//   }

//   const token = jwt.sign(
//     { id: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   res.json({
//     success: true,
//     message: "Login successful",
//     token,
//     user
//   });

// } catch (error) {
//   res.status(500).json({
//     success: false,
//     message: "Login failed",
//     error: error.message
//   });
// }
// };















// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // REGISTER
// exports.registerUser = async (req, res) => {
//   try {
//     const { email, password, status } = req.body; // optional status for role-like assignment

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists"
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       email,
//       password: hashedPassword,
//       status: status || "user" // default to "user"
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Registration failed",
//       error: error.message
//     });
//   }
// };

// // LOGIN
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }

//     // Block login if user is banned
//     if (user.status === "banned") {
//       return res.status(403).json({
//         success: false,
//         message: "Your account has been banned"
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }

//     // Generate JWT with user ID and status
//     const token = jwt.sign(
//       { id: user._id, status: user.status },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Login failed",
//       error: error.message
//     });
//   }
// };

















const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { email, password, status } = req.body; // optional status for role-like assignment

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      status: status || "user" // default to "user"
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Block login if user is banned
    if (user.status === "banned") {
      return res.status(403).json({
        success: false,
        message: "Your account has been banned"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT with user ID and status
    const token = jwt.sign(
      { id: user._id, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};