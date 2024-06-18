// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../models/User");
// const userModel = require("../models/userModel")
const User = require("../models/User");
dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header
		const token =
		    // req.headers['authorization'].split(" ")[1] ||
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
			req.body.userId = decode.userId;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		const user = await User.findOne({email: req.user.email});

        if (user.isAdmin !== true) {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `Admin Role Can't be Verified` });
    }
};

exports.isDoc = async (req, res, next) => {
	try {
		const user = await User.findOne({email: req.user.email});

        if (user.isDoctor !== true) {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `Admin Role Can't be Verified` });
    }
};
exports.isUser = async (req, res, next) => {
	try {
		const userDetails = await userModel.findOne({ email: req.user.email });

		if (userDetails.accountType !== "User") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be User` });
	}
};

exports.isDoctor = async (req, res, next) => {
	try {
		const userDetails = await userModel.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Doctor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Doctor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `Doctor Role Can't be Verified` });
	}
};

