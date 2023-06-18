// submitting sign up form
const signUpForm = document.querySelector(".login-form");

const signUpUser = async (username, password, path) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        username,
        password,
        path,
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

signUpForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const path = document.getElementById("path").value;

	signUpUser(username, password,path);
});

// const d = [
//   // { username: "vansh2022", password: "Barn", path: "c" },
//   { username: "power", password: "butter", ph: "b" },
//   // { username: "powerpuffs", password: "buy", path: "b" },
//   // { username: "blue lock", password: "bluock", path: "c" },
//   // { username: "Hunters1", password: "ha", path: "c" },
//   // { username: "Random", password: "12", path: "a" },
//   // { username: "Incheif", password: "gld", path: "c" },
//   // { username: "Sahil Jain", password: "Sl Jain", path: "b" },

// ];
// signUpForm.addEventListener("submit", (e) => {
//   for (let i = 0; i < d.length; i++) {
//     signUpUser(d[i].username, d[i].password, d[i].path);
//   }
// });
