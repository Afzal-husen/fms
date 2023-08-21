import { sqlConnection } from "../connectDB.js";
import validator from "validator";
import { CustomError } from "../middleware/customError.js";
import bcrypt from "bcrypt";
import { send_Token } from "../utils/sendToken.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password)

  if (!email) return next(new CustomError(400, "please provide Email"));
  else if (!password)
    return next(new CustomError(400, "please provide Password"));

  const validated = validator.isEmail(email);
  if (!validated)
    return next(new CustomError(400, "please provide valid Email"));

  try {
    const sql = "SELECT * FROM users WHERE email = '" + email + "'";
    const [rows] = await sqlConnection.query(sql);

    if (rows.length === 0)
      return next(new CustomError(400, `No user found with email: ${email}`));

    const isPasswordCorrect = await bcrypt.compare(password, rows[0].password)
    if (!isPasswordCorrect)
      return next(new CustomError(400, "Wrong password!"));

    const [user] = rows;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // req.session.token = token

    send_Token(res, token);

    res.status(200).json({
      success: true,
      message: "Login Success!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

//register
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const validated = validator.isEmail(email);

  try {
    if (!username)
      return next(new CustomError(400, "please provide a username"));

    if (!email) return next(new CustomError(400, "please provide Email"));

    if (!validated)
      return next(new CustomError(400, "please provide valid Email"));

    if (!password) return next(new CustomError(400, "please provide password"));

    const salt = await bcrypt.genSalt(10);
    const encrypted_password = await bcrypt.hash(password, salt);

    const userId = crypto.randomBytes(10).toString("hex");
    console.log(userId)

    const sql =
      "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)";
    const [rows] = await sqlConnection.query(sql, [
      userId,
      username,
      email,
      encrypted_password,
    ]);

    res.status(200).json({
      success: true,
      message: "registration successfull",
    });
  } catch (error) {
    next(error);
  }
};

// logout
export const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "logout success",
    });
  } catch (error) {
    next(error);
  }
};

//index or home page
export const home_page = async (req, res, next) => {
  const { id } = req.user;
  try {
    const sql = "SELECT * FROM  users WHERE id = '" + id + "' ";
    const [rows] = await sqlConnection.query(sql);
    const [user] = rows;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
