const express = require("express");
const userController = require("../controllers/userController");
const playController = require("../controllers/playController");

const router = express.Router();

router.get("/login", (req, res) => {
	res.status(200).render("login", {
		title: "Login",
	});
});

// router.get("/signupAdmin", (req, res) => {
// 	res.status(200).render("signup", {
// 		title: "Sign Up",
// 	});
// });

// Just to check if user is logged in or not so that the header can render accordingly
router.use(userController.isLoggedIn);

router.get("/leaderboard", async (req, res) => {
	const users = await playController.getDashboardView();
	res.status(200).render("leaderboard", {
		title: "Dashboard",
		users,
	});
});

router.use(userController.protect);

router.get("/play", async (req, res) => {
	const question = await playController.getViewQuestion(req);
	res.status(200).render("play", {
		question,
		title: "Play",
	});
});


router.get("/results", async (req, res) => {
	const userRank = await userController.checkRank(req);
	// console.log(userRank);
	res.status(200).render("result", {
		userRank,
		title: "Result",
	});
});

router.get("/", (req, res) => {
	res.status(200).render("index", {
		title: "Home",
	});
});
router.get("/henrycreel", (req, res) => {
	res.status(200).render("henry", {
		title: "Creeeeel",
	});
});
router.get("/cpag", (req, res) => {
	res.status(200).render("cpag", {
		title: "The King",
	});
});
router.get("/9Q6mnwWdzM", (req, res) => {
	res.status(200).render("master", {
		title: "THE MASTER",
	});
});
router.get("/a12mkLO", (req, res) => {
	res.status(200).render("finalanswer", {
		title: "THE MASTER",
	});
});
router.get("/koiladkihai", (req, res) => {
	res.status(200).render("koiladkihai", {
		title: "nice",
	});
});
router.get("/sherlock", (req, res) => {
	res.status(200).render("sherlock", {
		title: "Sherlock",
	});
});
router.get("/donaldmustard", (req, res) => {
	res.status(200).render("don", {
		title: "Donald",
	});
});



// router.get("/newQuestion", async (req, res) => {
// 	res.status(200).render("addQuestion", {
// 		title: "New Question",
// 	});
// });
router.get("/if0undthe3aster", async (req, res) => {
	res.status(200).render("easter5", {
		title: "Easter",
	});
});



router.get("/format", async (req, res) => {
	res.status(200).render("format", {
		title: "Format",
	});
});



const fake = "/1492219588 /fortnite /roundtable /aurora3.0 /password";
const easteregg1str = "/master /themaster /internationalwomensday /ford /builttough /accelerateequality /fortisfortunaadiuvat /johnwick /fresources.tech /fresources /doggy"

const easteregg2str = "/council /pastebin /bitly /tinyurl /twitter /demonslayer /nationaltreasure2 /nationaltreasure /mountain /rickroll"

const easteregg3str = "/discord /unstop /atb /spotify /worldcup /msdhoni /bakerstreet /pikachu /4152 /jeemain /batman /akshaykumar"

const easteregg4str = "/chakdhoomdhoom /burarideaths /planet /sampreetiyadav /facebook /cgpa /meta /spanish /345359 /omega"

const arrFake = fake.split(" ");
const arr1 = easteregg1str.split(" ");
const arr2 = easteregg2str.split(" ");
const arr3 = easteregg3str.split(" ");
const arr4 = easteregg4str.split(" ");

arrFake.forEach(easteregg1);
arr1.forEach(easteregg1);
arr2.forEach(easteregg2);
arr3.forEach(easteregg3);
arr4.forEach(easteregg4);






function fakelinks(item) {
	router.get(item, async (req, res) => {
		res.status(200).render("notthis", {
			title: "Not This",
		});
	});
  }




function easteregg1(item) {
	router.get(item, async (req, res) => {
		res.status(200).render("easter1", {
			title: "Easter Egg 1",
		});
	});
  }

function easteregg2(item) {
	router.get(item, async (req, res) => {
		res.status(200).render("easter2", {
			title: "Easter Egg 2",
		});
	});
  }
function easteregg3(item) {
	router.get(item, async (req, res) => {
		res.status(200).render("easter3", {
			title: "Easter Egg 3",
		});
	});
  }
function easteregg4(item) {
	router.get(item, async (req, res) => {
		res.status(200).render("easter4", {
			title: "Easter Egg 4",
		});
	});
  }






module.exports = router;
