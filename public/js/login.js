$(document).ready(function() {
  var loginForm = $("form.form-signin");
  var emailInput = $("input#inputEmail");
  var passwordInput = $("input#inputPassword");

  // Submits log in form if both email and password are entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    loginUser(userData.email, userData.password);

    emailInput.val("");
    passwordInput.val("");
  });

  // Logs user in to site
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        $.get("/api/user_data").then(function() {
          // chefId = data.id;
          window.location.replace("/profile");
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
