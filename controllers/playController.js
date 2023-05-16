const User = require("../models/userModel");
const Question = require("../models/questionModel");
const Response = require("../models/responseModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const quesState ={
	"a" : ["645fa1a08e0bb038d4c95f4f" ,"645fa1848e0bb038d4c95f41","645fa3da8e0bb038d4c95fb4","645fa3f08e0bb038d4c95fbb", "645fa4138e0bb038d4c95fc2"  ],

	"b" : ["645fa4138e0bb038d4c95fc2", "645fa3f08e0bb038d4c95fbb" , "645fa3da8e0bb038d4c95fb4" ,"645fa1848e0bb038d4c95f41", "645fa1a08e0bb038d4c95f4f" ]
}

// 00. Get total number of questions
const getTotalQuestions = async () => {
	// let number = await Question.countDocuments({});
	let number = quesState["a"].length;
	return number;
};

// 01. Gets question for the user based on its current level
exports.getQuestion = catchAsync(async (req, res, next) => {
	// If user has completed the quiz
	if (req.user.level + 1 >= (await getTotalQuestions())) {
		return res.status(200).json({
			status: "success",
			message: "Congratulations you have completed Aurora3.0!",
		});
	}



	const pathArr = quesState[req.user.path];

	

	const question = await Question.findById(pathArr[req.user.level]);

	if (!question) {
		throw new AppError("This question does not exist. (yet?).", 403);
	}

	res.status(200).json({
		status: "success",
		data: {
			question,
		},
	});
});

// 01A. Get Question for view controller
exports.getViewQuestion = async (req) => {
	const questionObject = {};
	if (req.user.level + 1 > (await getTotalQuestions())) {
		questionObject.completed = true;
		return questionObject;
	}

	// const question = await Question.findOne({ level: req.user.level });
	const pathArr = quesState[req.user.path];

	

	const question = await Question.findById(pathArr[req.user.level]);


	if (!question) {
		questionObject.completed = true;
		return questionObject;
	}

	return question;
};




// let flag = true;

// Set the target date and time (May 15th, 2023, 10:52 PM IST)
const targetDate = new Date("2023-05-25T23:15:00+05:30");
// 02. Checks user answer for its level

	exports.checkAnswer = catchAsync(async (req, res, next) => {
		const currentTimeIST = req.body.now.toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false });
		if (new Date(currentTimeIST) < targetDate) {
			
		  
		const { level, username,path } = req.user;
		const pathArr = quesState[path];

	

		const question = await Question.findById(pathArr[req.user.level]).select("+answer");
		// const question = await Question.findOne({ level }).select("+answer");
	
		if (!question) {
			throw new AppError("This question does not exist. (yet?).", 403);
		}
	
		await Response.create({
			answer: req.body.answer,
			level,
			username,
		});
	
		if (question.answer !== req.body.answer) {
			throw new AppError("Wrong answer, please try again", 400);
		}
	
		if (level + 1 >= (await getTotalQuestions())) {
			const newLevel = level + 1;
	
			await User.findByIdAndUpdate(req.user._id, {
				level: newLevel,
				lastSolved: Date.now(),
			});
	
			return res.status(200).json({
				status: "success",
				message: "Congratulations you have completed Aurora 3.0!",
			});
		}
	
		const newLevel = level + 1;
	
		await User.findByIdAndUpdate(req.user._id, {
			level: newLevel,
			lastSolved: Date.now(),
		});
	
		res.status(200).json({
			status: "success",
			message: `Welcome to level ${newLevel} `,
		});
	}
	else {

		  return res.status(403).json({
			status: "error",
			message: "The hunt has ended",
		  });
	  }

	});










// 03. Get the game dashboard
exports.getDashboard = catchAsync(async (req, res, next) => {
	const users = await User.find().sort("-level lastSolved");

	res.status(200).json({
		status: "success",
		data: {
			users,
		},
	});
});

// 03A. Get the game dashboard
exports.getDashboardView = async (req, res, next) => {
	const users = await User.find().sort("-level lastSolved");

	return users;
};
