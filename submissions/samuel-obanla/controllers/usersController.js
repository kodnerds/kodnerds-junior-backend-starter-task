const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
const { users } = require("../models/usersModel");


const registerUser = asyncHandler(async (req, res) => {
  try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;

        const existingUser = await users.find({
            $or: [{ email }, { phoneNumber }]
        });
        

        if (existingUser.length) {
            if (existingUser[0].email === email) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                })
            }
            return res.status(400).json({
                success: false,
                message: "Phone number already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        const newUser = new users({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body

        const checkUser = await users.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }

        if (!await bcrypt.compare(password, checkUser.password)) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            { userId: checkUser._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "15d" }
        );
        
        res.status(200).json({ 
            success: true,
            message: "Login successful",
            data: {
                token
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await users.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetch successful",
            data: user,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = {
    registerUser,
    loginUser,
    getUser
}