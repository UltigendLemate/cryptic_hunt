// submitting sign up form
const signUpForm = document.querySelector(".login-form");

const signUpUser = async (username, password) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/users/signup",
			data: {
				username,
				password,
			},
		});
		M.toast({
			html: `You have been registered. You will be redirected soon.`,
			classes: "success-toast",
		});
		setTimeout(() => {
			location.assign("/play");
		}, 2000);
	} catch (err) {
		M.toast({ html: `${err.response.data.message}`, classes: "error-toast" });
	}
};

// signUpForm.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	const username = document.getElementById("username").value;
// 	const password = document.getElementById("password").value;

// 	signUpUser(username, password);
// });


const d = [
	{username : "binarybits", password : "anshbhatia123"},
	{username : "gorrilaplayer", password : "bhaskar12345"},
	{username : "rizzguru", password : "harshishere789123"},
	{username : "zorkahaisha", password : "anujisheres31"},
	{username : "lordkingorwhat", password : "parthjainislordking"},
	{username : "mahatmagandhi", password : "rishisaunakuk"},
	{username : "avengersinfinity", password : "parthguptaislordking"},

]
signUpForm.addEventListener("submit", (e) => {
	for(let i=0;i<d.length;i++){
		signUpUser(d[i].username,d[i].password);
	}
});
