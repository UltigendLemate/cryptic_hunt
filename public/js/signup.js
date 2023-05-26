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

// signUpForm.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	const username = document.getElementById("username").value;
// 	const password = document.getElementById("password").value;

// 	signUpUser(username, password);
// });

const d = [
  { username: "adsfaf asdf as ", password: "abcdef12346", path: "b" },
  { username: "adsfaac 1", password: "abcdef12347", path: "c" },
  { username: "adsfaac 2", password: "abcdef12348", path: "b" },
  { username: "adsfaac 3", password: "abcdef12349", path: "b" },
  { username: "adsfaac 4", password: "abcdef12350", path: "b" },
  { username: "adsfaac 5", password: "abcdef12351", path: "b" },
];
signUpForm.addEventListener("submit", (e) => {
  for (let i = 0; i < d.length; i++) {
    signUpUser(d[i].username, d[i].password, d[i].path);
  }
});
