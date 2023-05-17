const express = require("express");
const userController = require("../controllers/userController");
const playController = require("../controllers/playController");

const router = express.Router();

router.get("/login", (req, res) => {
	res.status(200).render("login", {
		title: "Login",
	});
});

router.get("/signupAdmin", (req, res) => {
	res.status(200).render("signup", {
		title: "Sign Up",
	});
});

// Just to check if user is logged in or not so that the header can render accordingly
router.use(userController.isLoggedIn);

router.get("/leaderboard", async (req, res) => {
	const users = await playController.getDashboardView();
	res.status(200).render("leaderboard", {
		title: "Dashboard",
		users,
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
router.get("/ExZRawwR", (req, res) => {
	res.status(200).render("master", {
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

router.use(userController.protect);

router.get("/play", async (req, res) => {
	const question = await playController.getViewQuestion(req);
	res.status(200).render("play", {
		question,
		title: "Play",
	});
});

router.get("/newQuestion", async (req, res) => {
	res.status(200).render("addQuestion", {
		title: "New Question",
	});
});

module.exports = router;
