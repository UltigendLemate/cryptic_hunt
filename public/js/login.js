// submitting login form
const loginForm = document.querySelector(".login-form");

const loginUser = async (username, password) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/users/login",
			data: {
				username,
				password,
			},
		});
		M.toast({
			html: `Welcome to Aurora 3.0. You will be redirected soon.`,
			classes: "success-toast",
		});
		setTimeout(() => {
			location.assign("/play");
		}, 2000);
	} catch (err) {
		M.toast({ html: `${err.response.data.message}`, classes: "error-toast" });
	}
};

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	if (username === "loginhere" && password === "aurora3.0") {
		M.toast({ html: `Good boy. Answer is aurora_i5_fun`, classes: "success-toast" });
		return;
	}
	else if (username === "loginhere") {
		M.toast({ html: `This aint gonna work boy`, classes: "error-toast" });
		return;

	}
	else{

	loginUser(username, password);
	}
});
