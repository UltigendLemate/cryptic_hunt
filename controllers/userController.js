const util = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// 0. Generating and providing jwt
const generateJwt = async (user, res) => {
	const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});

	// Remove password
	if (user.password) {
		user.password = undefined;
	}

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production" ? true : false,
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
	});

	res.status(200).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

// 1. Signing up participants
exports.signupUser = catchAsync(async (req, res, next) => {
	const userInfo = {
		username: req.body.username,
		password: req.body.password,
		path : req.body.path,
	};

	const newUser = await User.create(userInfo);

	await generateJwt(newUser, res);
});

// 2. Login User
exports.loginUser = catchAsync(async (req, res, next) => {
	const { username, password } = req.body;

	const foundUser = await User.findOne({ username }).select("+password");

	if (!foundUser) {
		throw new AppError("Invalid username or password. Please try again!", 404);
	}

	const checked = await foundUser.comparePassword(password, foundUser.password);

	if (!checked) {
		throw new AppError("Invalid username or password. Please try again!", 404);
	}

	await generateJwt(foundUser, res);
});

// 3. Auth middleware for protected routes
exports.protect = catchAsync(async (req, res, next) => {
	let token = "";
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		throw new AppError("Please login to access!", 400);
	}

	const payload = await util.promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);

	const user = await User.findById(payload.id);
	if (!user) {
		throw new AppError("This user does not exist.", 404);
	}

	req.user = user;
	res.locals.user = user;
	next();
});

// 3A. Auth middleware to just check if user is logged in or not for informing the views about it.
exports.isLoggedIn = catchAsync(async (req, res, next) => {
	let token = "";
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next();
	}

	const payload = await util.promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);

	const user = await User.findById(payload.id);
	if (!user) {
		return next();
	}

	res.locals.user = user;
	next();
});

// 4. Auth middleware for user roles
exports.restrictTo = (...roles) => {
	return catchAsync(async (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new AppError(
				"You do not have permission to perform this action.",
				403
			);
		}
		next();
	});
};

// 5. Logout uses
exports.logout = (req, res, next) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10),
	});

	res.status(200).json({
		status: "success",
	});
};


// 6. Checking rank of that user
// xD made this list using python. could've used js as well but was lazy.
const rankData =[

	{
	  "Rank": "1",
	  "Name": "noobs",
	  "Score": "14100"
	},
	{
	  "Rank": "2",
	  "Name": "RishabhNovaTrick",
	  "Score": "14100"
	},
	{
	  "Rank": "3",
	  "Name": "coreana",
	  "Score": "13800"
	},
	{
	  "Rank": "4",
	  "Name": "Jabaaz",
	  "Score": "13700"
	},
	{
	  "Rank": "5",
	  "Name": "BabluDeep",
	  "Score": "13600"
	},
	{
	  "Rank": "6",
	  "Name": "cw",
	  "Score": "13600"
	},
	{
	  "Rank": "7",
	  "Name": "Double Big DD",
	  "Score": "13499"
	},
	{
	  "Rank": "8",
	  "Name": "678620-U8N42IW1",
	  "Score": "13000"
	},
	{
	  "Rank": "9",
	  "Name": "EN1GMATICS",
	  "Score": "12949"
	},
	{
	  "Rank": "10",
	  "Name": "Ajnabee",
	  "Score": "12899"
	},
	{
	  "Rank": "11",
	  "Name": "Drip peacock",
	  "Score": "12650"
	},
	{
	  "Rank": "12",
	  "Name": "AKM",
	  "Score": "12600"
	},
	{
	  "Rank": "13",
	  "Name": "BLINQUE",
	  "Score": "12500"
	},
	{
	  "Rank": "14",
	  "Name": "Mystics",
	  "Score": "12450"
	},
	{
	  "Rank": "15",
	  "Name": "Gt hunters",
	  "Score": "12450"
	},
	{
	  "Rank": "16",
	  "Name": "Hera Pheri",
	  "Score": "12300"
	},
	{
	  "Rank": "17",
	  "Name": "Jake and never land pirates",
	  "Score": "12300"
	},
	{
	  "Rank": "18",
	  "Name": "12300",
	  "Score": ""
	},
	{
	  "Rank": "19",
	  "Name": "Avocado",
	  "Score": "12300"
	},
	{
	  "Rank": "20",
	  "Name": "N1NJA",
	  "Score": "12300"
	},
	{
	  "Rank": "21",
	  "Name": "678620-U76A0770",
	  "Score": "12300"
	},
	{
	  "Rank": "22",
	  "Name": "MARVELS",
	  "Score": "12300"
	},
	{
	  "Rank": "23",
	  "Name": "Hunters",
	  "Score": "12300"
	},
	{
	  "Rank": "24",
	  "Name": "Binary bytes",
	  "Score": "12300"
	},
	{
	  "Rank": "25",
	  "Name": "Pandas",
	  "Score": ""
	},
	{
	  "Rank": "26",
	  "Name": "678620-U0X840MW",
	  "Score": "12200"
	},
	{
	  "Rank": "27",
	  "Name": "Byte Bandits",
	  "Score": "12200"
	},
	{
	  "Rank": "28",
	  "Name": "Quantum",
	  "Score": "12150"
	},
	{
	  "Rank": "29",
	  "Name": "Fiery blasters",
	  "Score": "12150"
	},
	{
	  "Rank": "30",
	  "Name": "Enigma",
	  "Score": "12150"
	},
	{
	  "Rank": "31",
	  "Name": "Unstoppable 3.0",
	  "Score": "12100"
	},
	{
	  "Rank": "32",
	  "Name": "AVNG123",
	  "Score": "12100"
	},
	{
	  "Rank": "33",
	  "Name": "ATOM",
	  "Score": "12000"
	},
	{
	  "Rank": "34",
	  "Name": "SUPERIORS",
	  "Score": "12000"
	},
	{
	  "Rank": "35",
	  "Name": "DECODERS",
	  "Score": "12000"
	},
	{
	  "Rank": "36",
	  "Name": "Buri Buri Zaimon",
	  "Score": "12000"
	},
	{
	  "Rank": "37",
	  "Name": "REBOOTERS",
	  "Score": "12000"
	},
	{
	  "Rank": "38",
	  "Name": "anand8795",
	  "Score": "12000"
	},
	{
	  "Rank": "39",
	  "Name": "DLR",
	  "Score": "12000"
	},
	{
	  "Rank": "40",
	  "Name": "Wolf",
	  "Score": "12000"
	},
	{
	  "Rank": "41",
	  "Name": "SHIVSID",
	  "Score": "12000"
	},
	{
	  "Rank": "42",
	  "Name": "ITUS",
	  "Score": "12000"
	},
	{
	  "Rank": "43",
	  "Name": "FRESH-GEEKS",
	  "Score": "12000"
	},
	{
	  "Rank": "44",
	  "Name": "Logical err",
	  "Score": "12000"
	},
	{
	  "Rank": "45",
	  "Name": "#D62828Alert",
	  "Score": "12000"
	},
	{
	  "Rank": "46",
	  "Name": "TEAM TROOPERS",
	  "Score": "12000"
	},
	{
	  "Rank": "47",
	  "Name": "ByteMe",
	  "Score": "12000"
	},
	{
	  "Rank": "48",
	  "Name": "The unsupervised",
	  "Score": "12000"
	},
	{
	  "Rank": "49",
	  "Name": "ClueBusters",
	  "Score": "12000"
	},
	{
	  "Rank": "50",
	  "Name": "TechBros",
	  "Score": "12000"
	},
	{
	  "Rank": "51",
	  "Name": "Joy Build",
	  "Score": "12000"
	},
	{
	  "Rank": "52",
	  "Name": "Terminators",
	  "Score": "12000"
	},
	{
	  "Rank": "53",
	  "Name": "Paradox",
	  "Score": "12000"
	},
	{
	  "Rank": "54",
	  "Name": "Blue",
	  "Score": "12000"
	},
	{
	  "Rank": "55",
	  "Name": "Kiptik Hunters",
	  "Score": "12000"
	},
	{
	  "Rank": "56",
	  "Name": "Sahil Jain",
	  "Score": "11800"
	},
	{
	  "Rank": "57",
	  "Name": "Nuxe",
	  "Score": "11500"
	},
	{
	  "Rank": "58",
	  "Name": "TYPE C",
	  "Score": "11350"
	},
	{
	  "Rank": "59",
	  "Name": "Enchanted programmers",
	  "Score": "11300"
	},
	{
	  "Rank": "60",
	  "Name": "TECH WOLVES",
	  "Score": "11100"
	},
	{
	  "Rank": "61",
	  "Name": "Binary breakers",
	  "Score": "11000"
	},
	{
	  "Rank": "62",
	  "Name": "Electrified Explorers",
	  "Score": "11000"
	},
	{
	  "Rank": "63",
	  "Name": "Supra",
	  "Score": "10700"
	},
	{
	  "Rank": "64",
	  "Name": "Boba tea",
	  "Score": "10700"
	},
	{
	  "Rank": "65",
	  "Name": "gunsnbot",
	  "Score": "10550"
	},
	{
	  "Rank": "66",
	  "Name": "Phoenix",
	  "Score": "10500"
	},
	{
	  "Rank": "67",
	  "Name": "Clue Crew",
	  "Score": "10500"
	},
	{
	  "Rank": "68",
	  "Name": "Dumbledore's army",
	  "Score": "10500"
	},
	{
	  "Rank": "69",
	  "Name": "Flash",
	  "Score": "10500"
	},
	{
	  "Rank": "70",
	  "Name": "rakshak",
	  "Score": "10500"
	},
	{
	  "Rank": "71",
	  "Name": "blossom",
	  "Score": "10450"
	},
	{
	  "Rank": "72",
	  "Name": "The Super Mario Vrozzz",
	  "Score": "10150"
	},
	{
	  "Rank": "73",
	  "Name": "King kohli",
	  "Score": "10000"
	},
	{
	  "Rank": "74",
	  "Name": "KASKASUKABE",
	  "Score": "9800"
	},
	{
	  "Rank": "75",
	  "Name": "",
	  "Score": "9800"
	},
	{
	  "Rank": "76",
	  "Name": "Boyz",
	  "Score": "9650"
	},
	{
	  "Rank": "77",
	  "Name": "Ravenclaws",
	  "Score": "9500"
	},
	{
	  "Rank": "78",
	  "Name": "",
	  "Score": "9500"
	},
	{
	  "Rank": "79",
	  "Name": "Hunters1",
	  "Score": "9500"
	},
	{
	  "Rank": "80",
	  "Name": "blue lock",
	  "Score": "9500"
	},
	{
	  "Rank": "81",
	  "Name": "",
	  "Score": "9000"
	},
	{
	  "Rank": "82",
	  "Name": "Bottom G",
	  "Score": ""
	},
	{
	  "Rank": "83",
	  "Name": "TRIMURTI",
	  "Score": "8500"
	},
	{
	  "Rank": "84",
	  "Name": "#include<us>",
	  "Score": "7500"
	},
	{
	  "Rank": "85",
	  "Name": "Akatsuki",
	  "Score": "7500"
	},
	{
	  "Rank": "86",
	  "Name": "Cryptic crusaders",
	  "Score": "7500"
	},
	{
	  "Rank": "87",
	  "Name": "Incognito",
	  "Score": "7000"
	},
	{
	  "Rank": "88",
	  "Name": "TEAM DEADLY",
	  "Score": "7000"
	},
	{
	  "Rank": "89",
	  "Name": "Phantoms",
	  "Score": ""
	},
	{
	  "Rank": "90",
	  "Name": "Tech Raiders",
	  "Score": "6500"
	},
	{
	  "Rank": "91",
	  "Name": "Cyber Town",
	  "Score": "6500"
	},
	{
	  "Rank": "92",
	  "Name": "Decoder",
	  "Score": "6000"
	},
	{
	  "Rank": "93",
	  "Name": "BitcoinDiggers",
	  "Score": "6000"
	},
	{
	  "Rank": "94",
	  "Name": "The Cosmos",
	  "Score": "5500"
	},
	{
	  "Rank": "95",
	  "Name": "MAESTROS",
	  "Score": "5000"
	},
	{
	  "Rank": "96",
	  "Name": "Eskimos",
	  "Score": "5000"
	},
	{
	  "Rank": "97",
	  "Name": "vansh2022",
	  "Score": "5000"
	},
	{
	  "Rank": "98",
	  "Name": "Aurora's angel",
	  "Score": "5000"
	},
	{
	  "Rank": "99",
	  "Name": "678620U408ZY7x",
	  "Score": ""
	},
	{
	  "Rank": "100",
	  "Name": "power",
	  "Score": "5000"
	},
	{
	  "Rank": "101",
	  "Name": "Enigma Elite",
	  "Score": "5000"
	},
	{
	  "Rank": "102",
	  "Name": "kebab-case",
	  "Score": "4500"
	},
	{
	  "Rank": "103",
	  "Name": "admin",
	  "Score": "4000"
	},
	{
	  "Rank": "104",
	  "Name": "999FrLife",
	  "Score": "4000"
	},
	{
	  "Rank": "105",
	  "Name": "Cryptic Rizz",
	  "Score": "4000"
	},
	{
	  "Rank": "106",
	  "Name": "VIKINGS",
	  "Score": "4000"
	},
	{
	  "Rank": "107",
	  "Name": "Huntx",
	  "Score": "4000"
	},
	{
	  "Rank": "108",
	  "Name": "KASUKABE DEFENCE GROUP",
	  "Score": "3800"
	},
	{
	  "Rank": "109",
	  "Name": "ABCV-1854",
	  "Score": ""
	},
	{
	  "Rank": "110",
	  "Name": "huntx",
	  "Score": "3500"
	},
	{
	  "Rank": "111",
	  "Name": "HELL-FIRE",
	  "Score": "3500"
	},
	{
	  "Rank": "112",
	  "Name": "Mind readers",
	  "Score": "3500"
	},
	{
	  "Rank": "113",
	  "Name": "khalsa1234",
	  "Score": "3000"
	},
	{
	  "Rank": "114",
	  "Name": "Incheif",
	  "Score": "3000"
	},
	{
	  "Rank": "115",
	  "Name": "Bit rebels",
	  "Score": "3000"
	},
	{
	  "Rank": "116",
	  "Name": "shortrun",
	  "Score": "3000"
	},
	{
	  "Rank": "117",
	  "Name": "cryptic12",
	  "Score": "3000"
	},
	{
	  "Rank": "118",
	  "Name": "Pablodiscobar",
	  "Score": "3000"
	},
	{
	  "Rank": "119",
	  "Name": "Random",
	  "Score": "3000"
	},
	{
	  "Rank": "120",
	  "Name": "Team Almost",
	  "Score": "3000"
	},
	{
	  "Rank": "121",
	  "Name": "PhantomDX",
	  "Score": "2500"
	},
	{
	  "Rank": "122",
	  "Name": "DTU",
	  "Score": "500"
	},
	{
	  "Rank": "123",
	  "Name": "Sout(\"Hackers\");",
	  "Score": "500"
	},
	{
	  "Rank": "124",
	  "Name": "SunnyPunia",
	  "Score": "500"
	},
	{
	  "Rank": "125",
	  "Name": "Codster",
	  "Score": "500"
	},
	{
	  "Rank": "126",
	  "Name": "Quantox",
	  "Score": "500"
	},
	{
	  "Rank": "test",
	  "Name": "0",
	  "Score": ""
	},
	{
	  "Rank": "128",
	  "Name": "Tech. Hunters",
	  "Score": "0"
	},
	{
	  "Rank": "129",
	  "Name": "Code-exorcist",
	  "Score": "0"
	},
	{
	  "Rank": "130",
	  "Name": "Nuxe?",
	  "Score": "0"
	},
	{
	  "Rank": "131",
	  "Name": "High five hoops</td>",
	  "Score": "0"
	},
	{
	  "Rank": "132",
	  "Name": "678",
	  "Score": "0"
	},
	{
	  "Rank": "133",
	  "Name": "Akatsuki1",
	  "Score": "0"
	},
	{
	  "Rank": "134",
	  "Name": "ctrl shift n",
	  "Score": ""
	},
	{
	  "Rank": "135",
	  "Name": "loginhere",
	  "Score": "0"
	}
   ];

// function for rank checking
exports.checkRank = function (req,) {
	const username = req.user.username;
	const userRank = rankData.find(user => user.Name === username);

	return userRank;


	};



