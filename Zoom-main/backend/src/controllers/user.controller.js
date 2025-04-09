import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";

import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

// Helper function to normalize username (make lowercase for consistency)
const normalizeUsername = (username) => {
  return username.toLowerCase().trim();
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Username and password are required",
      });
    }

    // Normalize username for consistent lookup
    const normalizedUsername = normalizeUsername(username);

    // Use case-insensitive query for more flexible matching
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${normalizedUsername}$`, "i") },
    });

    if (!user) {
      console.log(`Login failed: User '${normalizedUsername}' not found`);
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();

      console.log(`User '${normalizedUsername}' logged in successfully`);
      return res.status(httpStatus.OK).json({ token: token });
    } else {
      console.log(
        `Login failed: Invalid password for user '${normalizedUsername}'`
      );
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid username or password",
      });
    }
  } catch (e) {
    console.error(`Login error: ${e.message}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred during login",
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Name, username, and password are required",
      });
    }

    // Normalize username for consistent storage
    const normalizedUsername = normalizeUsername(username);

    // Use case-insensitive query for checking existing users
    const existingUser = await User.findOne({
      username: { $regex: new RegExp(`^${normalizedUsername}$`, "i") },
    });

    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: normalizedUsername, // Store normalized username
      password: hashedPassword,
    });

    await newUser.save();
    console.log(`User '${normalizedUsername}' registered successfully`);

    res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (e) {
    console.error(`Registration error: ${e.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred during registration",
    });
  }
};

const getUserHistory = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Authentication token is required",
      });
    }

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid authentication token",
      });
    }

    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (e) {
    console.error(`Error fetching user history: ${e.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching meeting history",
    });
  }
};

const addToHistory = async (req, res) => {
  try {
    const { token, meeting_code } = req.body;

    if (!token || !meeting_code) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Token and meeting code are required",
      });
    }

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid authentication token",
      });
    }

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();
    console.log(
      `Meeting '${meeting_code}' added to history for user '${user.username}'`
    );

    res
      .status(httpStatus.CREATED)
      .json({ message: "Added meeting to history" });
  } catch (e) {
    console.error(`Error adding to history: ${e.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while adding to meeting history",
    });
  }
};

export { login, register, getUserHistory, addToHistory };
