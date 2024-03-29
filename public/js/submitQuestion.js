// submitting login form
const questionForm = document.querySelector(".question-form");

const submitAnswer = async (answer,now) => {
	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/play",
			data: {
				answer,
				now,
			},
		});
		M.toast({
			html: `${res.data.message}`,
			classes: "success-toast",
		});
		setTimeout(() => {
			location.reload(true);
		}, 1500);
	} catch (err) {
		M.toast({ html: `${err.response.data.message}`, classes: "error-toast" });
	}
	document.getElementById("answer").value = "";
};

if (questionForm) {
	questionForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const answer = document.getElementById("answer").value;
		const now = new Date();
		

		submitAnswer(answer,now);
	});
}
